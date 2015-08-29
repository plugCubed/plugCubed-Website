'use strict';

var lint = require('mocha-eslint');

var paths = [
    'lib/**/*.js',
    'middleware/**/*.js',
    'app.js',
    'routes/**/*.js'
];

var options = {};

lint(paths, options);
