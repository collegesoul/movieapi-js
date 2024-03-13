class Validator{
    constructor() {
        this.errors = new Map();
    }

    errorObject() {
        return Object.fromEntries(this.errors);
    }

    valid() {
        return this.errors.size === 0;
    }

    addError(key, message) {
        if (!this.errors.has(key)) {
            this.errors.set(key, message);
        }
    }

    check(ok, key, message) {
        if (!ok) {
            this.addError(key, message);
        }
    }

    unique(values) {
        const uniqueValues = new Map();
        for (let value of values) uniqueValues.set(value, true);
        return values.length === uniqueValues.size;
    }

}

module.exports = Validator;