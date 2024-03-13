const pool = require('./db');
const Movie = require('./movies');
class MovieModel{
    recordNotFound = 'record not found';
    editConflict = 'edit conflict';
    async Get(id) {
        if (id < 1) return [undefined, this.recordNotFound];
        const stmt = 'SELECT * FROM movies WHERE id = $1';
        try {
            const entries = new Map();
            const { rows } = await pool.query(stmt, [id]);

            for (let [key, value] of Object.entries(rows[0])) {
                entries.set(key, value);
            }
            return [Movie.fromMap(entries), undefined];
        } catch(e) {
           return [undefined, e.message];
        }
    }

    async Insert(movie) {
        const stmt = 'INSERT INTO movies (title, year, runtime, genres) VALUES ($1, $2, $3, $4) RETURNING *';
        try {
            const entries = new Map();
            const { rows} = await pool.query(stmt, [movie.title, movie.year, movie.runtime, movie.genres]);
            for (let [key, value] of Object.entries(rows[0])) {
                entries.set(key, value);
            }
            return [Movie.fromMap(entries), undefined];
        } catch (e) {
            return [undefined, e.message];
        }
    }

    async GetAll(){
        try {
            let movies = [];
            const { rows } = await pool.query('SELECT * FROM movies');
            for (let row of rows) {
                const entries = new Map();
                for (let [key, value] of Object.entries(row)) {
                    entries.set(key, value);
                }
                const movie = Movie.fromMap(entries);
                movies.push(movie);
            }
            return [movies, undefined];
        } catch (e) {
            return [undefined, e.message];
        }
    }

    async Update(movie) {
        const stmt = `UPDATE movies SET title = $1, year = $2, runtime = $3,
                  genres = $4, version = version + 1 WHERE id = $5 AND version = $6
                  RETURNING *`;
        try {
            const entries = new Map();
            const { rows } = await pool.query(stmt, [movie.title, movie.year, movie.runtime,
            movie.genres, movie.id, movie.version]);

            if (rows.length === 0) {
                return [undefined, this.editConflict];
            }
            for (let [key, value] of Object.entries(rows[0])) {
                entries.set(key, value);
            }
            return [Movie.fromMap(entries), undefined];
        } catch (e) {
            return [undefined, e.message];
        }
    }

    async Delete(id){
        const stmt = 'DELETE FROM movies WHERE id = $1 RETURNING *';
        try{
            const { rows } = await pool.query(stmt, [id]);
            if (rows.length === 0) {
                return this.recordNotFound;
            }
            return undefined;
        } catch (e) {
            return e.message;
        }
    }
}

module.exports = new MovieModel();