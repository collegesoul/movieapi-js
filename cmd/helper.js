const Movie = require('../internal/data/movies');
class Helper{
    
    readID(req) {
        let id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return [undefined, "invalid id format"]
        if (id < 1) return [undefined, "invalid id provided"];
        return [id, undefined];
    }

    runtimeReplacer(key, value) {
        if (key === 'runtime') {
            return `${value} mins`;
        }
        return value;
    }
    w
    writeJSON(res, data, status, replacer=null, headers=null){
        const js = JSON.stringify(data, replacer, 4)

        if (headers !== null) {
            for (let [key, value] of headers) {
                res.set(key, value);
            }
        }

        res.set('Content-Type', 'application/json')
            .status(status)
            .send(js);
    }

    readJSON(req) {
        let body = req.body;
        let entries = new Map();
        if (Object.keys(body).length === 0) {
            return [undefined, "body must not be empty"];
        }
        const unknownKey = Object.keys(body).find(field => !Movie.fields.includes(field));
        if (unknownKey){
            return [undefined,`body contains unknown key '${unknownKey}' `];
        }

        for (let [key, value] of Object.entries(body)) {
            entries.set(key, value);
        }
        let movie = Movie.fromMap(entries);
        let err = movie.runtimeCheck();
        if (err !== undefined) {
            return [undefined, err];
        }
        return [movie, undefined];

    }
}

module.exports = new Helper;