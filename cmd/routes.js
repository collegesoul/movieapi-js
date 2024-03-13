const express = require('express');
const router = express.Router();
const MovieModel = require('../internal/data/model');
const helper = require('./helper');
const error = require('./errors');
const Validator = require('../internal/validator/validator')



router.get('/v1/movie/:id', (req, res) =>{
    let [id, err] = helper.readID(req);
    if (err !== undefined) {
        error.errorResponse(res, 404, err);
        return;
    }
    MovieModel.Get(id).then( ([movie, err]) => {
        if (err !== undefined) {
            switch (err) {
                case MovieModel.recordNotFound:
                    error.notFoundResponse(res);
                    return;
                default:
                    error.serverErrorResponse(res, err);
                    return;
            }
        } else {
            helper.writeJSON(res, {'movie': movie}, 200, helper.runtimeReplacer);
        }
    });
})

router.get('/v1/movies', (req, res)=>{
    MovieModel.GetAll().then(([movies, err]) => {
        if (err !== undefined) {
            error.serverErrorResponse(res, err);
        } else {
            helper.writeJSON(res, {'movies': movies}, 200, helper.runtimeReplacer)
        }
    } )
})

router.post('/v1/movie', (req, res)=>{
    const [movie, err] = helper.readJSON(req)
    if (err !== undefined) {
        error.badRequest(res, err);
        return;
    }
    const validator = new Validator()
    movie.validateMovie(validator);
    if (!validator.valid()) {
        error.failedValidationResponse(res, validator.errorObject());
        return;
    }


    MovieModel.Insert(movie).then(([movie, err]) => {
        if (err !== undefined) {
            error.serverErrorResponse(res, err);
        } else {
            const headers = new Map([
                ['Location', `/v1/movies/${movie.id}`]
            ])
            helper.writeJSON(res, {'movie': movie}, 201, helper.runtimeReplacer, headers);
        }
    });
})

router.patch('/v1/movie/:id', (req, res)=>{
    let [id, err] = helper.readID(req);
    if (err !== undefined) {
        error.notFoundResponse(res);
        return;
    }


    MovieModel.Get(id).then( ([movie, err]) => {
        if (err !== undefined) {
            switch (err) {
                case MovieModel.editConflict:
                    error.editConflictResponse(res);
                    return;
                default:
                    error.serverErrorResponse(res, err);
                    return;
            }
        }
        let input;
        [input, err] = helper.readJSON(req);
        if (err !== undefined) {
            error.badRequest(res, err);
            return;
        }
        if (input.title !== '') {
            movie.title = input.title;
        }
        if (input.year !== 0) {
            movie.year = input.year;
        }
        if (input.runtime !== 0) {
            movie.runtime = input.runtime;
        }
        if (input.genres.length !== 0) {
            movie.genres = input.genres;
        }

        const validator = new Validator()
        movie.validateMovie(validator);
        if (!validator.valid()) {
            error.failedValidationResponse(res, validator.errorObject());
            return;
        }

        MovieModel.Update(movie).then(([m, err]) => {
            if (err !== undefined) {
                error.serverErrorResponse(res, err);
            } else {
                helper.writeJSON(res, {'movie': m}, 200, helper.runtimeReplacer);
            }
        });
    });


})

router.delete('/v1/movie/:id', (req, res)=>{
    let [id, err] = helper.readID(req);
    if (err !== undefined) {
        error.notFoundResponse(res);
        return;
    }
    MovieModel.Delete(id).then(err => {
        if (err !== undefined) {
            switch (err) {
                case MovieModel.recordNotFound:
                    error.notFoundResponse(res);
                    return;
                default:
                    error.serverErrorResponse(res, err);
                    return;
            }
        } else {
            helper.writeJSON(res, {'message': 'movie successfully deleted'}, 200);
        }
    });

})


module.exports = router;