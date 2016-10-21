'use strict';

const lint = require('mocha-eslint');
const isCI = require('is-ci');
const paths = [
    'lib/**/*.js',
    'middleware/**/*.js',
    'app.js',
    'routes/**/*.js',
    'test/*.js'
];

const options = {
    alwaysWarn: isCI
};

lint(paths, options);
