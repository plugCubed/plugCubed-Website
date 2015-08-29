'use strict';

module.exports = function *(next) {
    const lang = this.request.body && this.request.body.lang || 'en';
    this.cookies.set('locale', lang);
    this.status = 200;
};
