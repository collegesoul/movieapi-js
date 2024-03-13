/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.addConstraint('movies', 'movies_runtime_check', {
        check: 'runtime >= 0'
    });

    pgm.addConstraint('movies', 'movies_year_check', {
        check: "year BETWEEN 1888 AND date_part('year', CURRENT_DATE)"
    });

    pgm.addConstraint('movies', 'genres_length_check', {
       check: "array_length(genres, 1) BETWEEN 1 AND 5"
    });

};

exports.down = pgm => {
    pgm.dropConstraint('movies', 'genres_length_check');
    pgm.dropConstraint('movies', 'movies_year_check');
    pgm.dropConstraint('movies', 'movies_runtime_check');
};
