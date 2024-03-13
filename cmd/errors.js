const helper = require('./helper');
class ErrorResponse {

    #logError(err) {
        const timeFlag = new Date(Date.now()).toLocaleString();
        console.log(`${timeFlag}: ${err}`);
    }
    errorResponse(res, status, message) {
        const envelope = {error: message};
        helper.writeJSON(res, envelope, status);
    }

    serverErrorResponse(res, err) {
        this.#logError(err);
        const message = 'the server encountered a problem and could not process your request';
        this.errorResponse(res, 505, message);
    }

    notFoundResponse(res) {
        const message = 'the requested resource could not be found';
        this.errorResponse(res, 404, message);
    }

    badRequest(res, err) {
        this.errorResponse(res, 400, err);
    }

    editConflictResponse(res) {
        const message = 'unable to update the record due to an edit conflict, please try again';
        this.errorResponse(res, 409, message);
    }

    failedValidationResponse(res, err) {
        this.errorResponse(res, 422, err);
    }
}

module.exports = new ErrorResponse();