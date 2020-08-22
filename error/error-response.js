let { ResponseError,fixProperties } = require('./responses')

let classes = {
  
    BadRequestClientError: class BadRequestClientError extends ResponseError {
        constructor(error, req) {
            super(error, req);
            fixProperties(this);
            this.code = 400;
        }
    }
  
  
}
module.exports = {
    ...classes,ResponseError
};
