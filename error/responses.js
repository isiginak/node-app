function fixProperties  (that) {
    that.name = that.constructor.name;
    that.message=that.tempMessage; 
    that.stack=that.tempStack;
    delete that.tempMessage;
    delete that.tempStack;
}

let classes = {
ResponseError:class ResponseError extends Error {
    constructor(error, req) { 
        
        if (error&&error.message)
            super(error.message);
        else
            super('With out message');
     
        this.code = 500;
        this.error = true;
    
        if(typeof error=='string'&&error!='undefined') 
            this.message = error;
        if(error&&error.isAxiosError&&error.response&&error.response.data&&error.response.data.message)
            {
            this.message = error.response.data.message;
            this.stack=error.response.data.stack;
            }
        if(req && req.originalUrl)  
            this.message +=  ` URL: ${req.originalUrl}` ;
        this.tempMessage=this.message;
        this.tempStack=this.stack;
        delete this.message;
        delete this.stack;
    }
},
Response: class Response {
    constructor(message, data) {
        this.code = 200;
        this.error = false;
        this.message = message || `Success!`;
        this.data = data || [];
    }
}
}

module.exports = { ...classes,fixProperties }