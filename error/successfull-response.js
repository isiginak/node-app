const { Response } = require('./responses')
let classes = {
    OkSuccessfulResponse: class OkSuccessfulResponse extends Response {
        constructor(message, data) {
            super(message, data);
        }
    }
}

module.exports = {
    ...classes
};