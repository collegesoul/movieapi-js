/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('movies', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        title: {
            type: 'text',
            notNull: true,
        },
        year: {
            type: 'integer',
            notNull: true,
        },
        runtime: {
            type: 'integer',
            notNull: true,
        },
        genres: {
            type: 'text[]',
            notNull: true
        },
        version: {
            type: 'integer',
            notNull: true,
            default: 1

        },
    }, {
        ifNotExists: true
    })
};

exports.down = pgm => {
    pgm.dropTable('users', {
        ifExists: true
    })
};
