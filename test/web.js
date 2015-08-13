var request = require('supertest');
var server = require('../app.js').listen();
var http = require('http');
var chai = require('chai');
var expect = chai.expect;
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
