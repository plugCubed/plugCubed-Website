'use strict';

const http = require('http');

module.exports = function *errorHandler(next) {
    try {
        yield next;

        if (this.response.status === 404 && !this.response.body) {
            this.throw(404);
        }
    } catch (err) {
        this.status = err.status || 500;

        this.app.emit('error', err, this);

        switch (this.accepts('html', 'json', 'text')) {
            case 'json':
                this.body = {
                    error: http.STATUS_CODES[this.status]
                };
                yield next;
                break;
            case 'html':
                yield this.render('error', {
                    error: http.STATUS_CODES[this.status],
                    code: this.status,
                    url: this.originalUrl
                });
                break;
            case 'text':
                this.body = http.STATUS_CODES[this.status];
                yield next;
                break;
            default:
                yield this.throw(406);
        }
    }
};
