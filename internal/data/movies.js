class Movie {
    static fields = ['id', 'title', 'year', 'runtime', 'genres', 'version'];
    constructor(id, title, year, runtime, genres, version) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.genres = genres;
        this.version = version;
    }

    runtimeCheck() {
        const errorMessage = "invalid runtime format";
        if (typeof this.runtime === 'string') {
            let parts = this.runtime.split(' ');
            if (parts.length !== 2 || parts[1] !== 'mins') {
                return errorMessage;
            }
            let parsedRuntime = parseInt(parts[0], 10);
            if (Number.isNaN(parsedRuntime)) {
                return errorMessage;
            }
            this.runtime = parsedRuntime;
            return undefined;
        } else if (typeof this.runtime === 'number') {
            if (this.runtime < 0 || this.runtime > 0 || Number.isNaN(this.runtime)) {
                return errorMessage;
            }
            return undefined;
        }
        return errorMessage;
    }
    static fromMap(entries) {
        let id = entries.has('id') ? parseInt(entries.get('id'), 10) : 0;
        let title = entries.has('title') ? entries.get('title') : '';
        let year = entries.has('year') ? entries.get('year') : 0;
        let runtime = entries.has('runtime') ? entries.get('runtime') : 0;
        let genres = entries.has('genres') ? entries.get('genres') : [];
        let version = entries.has('version') ? entries.get('version') : 0;


        return new Movie(id, title, year, runtime, genres, version);
    }
    validateMovie(validator) {
        validator.check(this.title !== '', 'title', "must be provided");
        validator.check(this.title.length <= 500, 'title', "must not be more than 500 bytes long");

        validator.check(this.year !== 0, 'year', "must be provided");
        validator.check(this.year >= 1888, 'year', "must be greater than 1888");
        validator.check(this.year <= new Date().getFullYear(), 'year', "must not be in the future");

        validator.check(this.runtime !== 0, 'runtime', "must be provided");
        validator.check(this.runtime >= 0, 'runtime', "must be a positive integer");

        validator.check(this.genres.length >= 1, 'genres', "must contain at least one genre");
        validator.check(this.genres.length <= 5, 'genres', "must not contain more than 5 genres");
        validator.check(validator.unique(this.genres), 'genres', "must not contain duplicate values");
    }
}

module.exports = Movie;