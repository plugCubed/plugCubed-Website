'use strict';

module.exports = function *(next) {
    const lang = (this.request.body && typeof this.request.body.lang === 'string' ? this.request.body.lang : 'en');

    this.cookies.set('locale', lang);
    this.status = 200;
    yield next;
};
