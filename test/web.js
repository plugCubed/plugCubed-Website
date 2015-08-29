var request = require('supertest');
var server = require('../app.js').listen();
var http = require('http');
var chai = require('chai');
var expect = chai.expect;
var koa = require('koa');
var path = require('path');
var render = require('koa-ejs');
var router = require('koa-router')();
var app = koa();
render(app, {
    root: path.resolve('..', 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});
router.get('/404', function *() {
    this.response.body = null;
    this.status = 404;
});
router.get('/500', function *() {
    this.response.body = 'texthere';
    this.status = null;
});

app.use(require('../middleware/error'));
app.use(router.routes());
app.use(router.allowedMethods());


var errorServer = app.listen();

describe('Error Middleware Tests', function() {
    it('Should return text if Accept header is Text', function(done) {
        request(server)
            .get('/test')
            .set('Accept', 'text/plain')
            .expect('Content-Type', /text/)
            .expect('Not Found')
            .expect(404, done);
    });

    it('Should return 406 if Accept header is not set to text/* , text/html, or application/json', function(done) {
        request(server)
            .get('/test')
            .set('Accept', 'application/xml')
            .expect('Content-Type', /text/)
            .expect('Not Acceptable')
            .expect(406, done);
    });

    it('Should throw 404 if no response body is set and status is 404', function(done) {
        request(errorServer)
            .get('/404')
            .set('Accept', 'text/plain')
            .expect(404, done);
    });
    it('Should set error to 500 Internal Server Error if this.status is null / undefined', function(done) {
        request(errorServer)
            .get('/500')
            .set('Accept', 'text/plain')
            .expect('Internal Server Error')
            .expect(500, done);
    });

    it('Should return JSON if Accept header is JSON', function(done) {
        request(server)
            .get('/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('{"error":"Not Found"}')
            .expect(404, done)
    });
    it('Should return HTML if Accept header is HTML', function(done) {
        request(server)
            .get('/test')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(404, done)
    })
});

describe('GET /', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /about', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/about')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/about')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});


describe('GET /alpha', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/alpha')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/alpha')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /ambassadors', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/ambassadors')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/ambassadors')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});
describe('GET /commands', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/commands')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/commands')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /donations', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/donations')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/donations')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /features', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/features')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/features')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /install', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/install')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/install')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('POST /lang', function() {
    it('Should set a lang cookie', function(done) {
        var data = {
            lang: 'es'
        };
        request(server)
            .post('/lang')
            .type('form')
            .send(data)
            .expect(200)
            .expect('set-cookie', 'locale=es; path=/; httponly', done);
    });
    it('Should default to English for cookie', function(done) {
        request(server)
            .post('/lang')
            .type('form')
            .expect(200)
            .expect('set-cookie', 'locale=en; path=/; httponly', done);
    })

})

describe('GET /license', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/license')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/license')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});

describe('GET /readme', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/readme')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/readme')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});


describe('GET /translate', function() {
    it('Should return 200 Status', function(done) {
        request(server)
            .get('/translate')
            .expect(200, done);
    });

    it('Should be content type of text/html and charset of UTF-8', function(done) {
        request(server)
            .get('/translate')
            .expect('Content-Type', 'text/html; charset=utf-8', done);
    });
});
