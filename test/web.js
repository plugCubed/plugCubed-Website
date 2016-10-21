'use strict';

const request = require('supertest');
const server = require('../app.js').listen();
const koa = require('koa');
const path = require('path');
const render = require('koa-ejs');
const router = require('koa-router')();
const app = koa();

render(app, {
    root: path.resolve('..', 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});
router.get('/404', function *(next) {
    this.response.body = null;
    this.status = 404;
    yield next;
});
router.get('/500', function *(next) {
    this.response.body = 'texthere';
    this.status = null;
    yield next;
});

app.use(require('../middleware/error'));
app.use(router.routes());
app.use(router.allowedMethods());

const errorServer = app.listen();

describe('Error Middleware Tests', () => {
    it('Should return text if Accept header is Text', (done) => {
        request(server)
            .get('/test')
            .set('Accept', 'text/plain')
            .expect('Content-Type', /text/)
            .expect('Not Found')
            .expect(404, done);
    });

    it('Should return 406 if Accept header is not set to text/* , text/html, or application/json', (done) => {
        request(server)
            .get('/test')
            .set('Accept', 'application/xml')
            .expect('Content-Type', /text/)
            .expect('Not Acceptable')
            .expect(406, done);
    });

    it('Should throw 404 if no response body is set and status is 404', (done) => {
        request(errorServer)
            .get('/404')
            .set('Accept', 'text/plain')
            .expect(404, done);
    });
    it('Should set error to 500 Internal Server Error if this.status is null / undefined', (done) => {
        request(errorServer)
            .get('/500')
            .set('Accept', 'text/plain')
            .expect('Internal Server Error')
            .expect(500, done);
    });

    it('Should return JSON if Accept header is JSON', (done) => {
        request(server)
            .get('/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('{"error":"Not Found"}')
            .expect(404, done);
    });
    it('Should return HTML if Accept header is HTML', (done) => {
        request(server)
            .get('/test')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(404, done);
    });
});

describe('GET /', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /about', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/about')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/about')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /alpha', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/alpha')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/alpha')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /ambassadors', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/ambassadors')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/ambassadors')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});
describe('GET /commands', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/commands')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/commands')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /donations', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/donations')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/donations')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /features', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/features')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/features')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /goodbye', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/goodbye')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/features')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /install', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/install')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/install')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /roomsettings', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/roomsettings')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/roomsettings')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('POST /lang', () => {
    it('Should set a lang cookie', (done) => {
        const data = {
            lang: 'es'
        };

        request(server)
            .post('/lang')
            .type('form')
            .send(data)
            .expect(200)
            .expect('set-cookie', 'locale=es; path=/; httponly', done);
    });

    it('Should default to English for cookie', (done) => {
        request(server)
            .post('/lang')
            .type('form')
            .expect(200)
            .expect('set-cookie', 'locale=en; path=/; httponly', done);
    });
});

describe('GET /license', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/license')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/license')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /readme', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/readme')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/readme')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /translate', () => {
    it('Should return 200 Status', (done) => {
        request(server)
            .get('/translate')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', (done) => {
        request(server)
            .get('/translate')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});
