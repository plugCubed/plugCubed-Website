

# Contributing Guide


### How to Contribute

* Please make sure it follows the same codestyle as shown in the source code.
* If using ES6 features please make sure that it is compatible with NodeJS v0.12 and above.
* We utilize [JSPM](https://jspm.io) as our frontend package manager and included a postinstall to install and bundle dependencies upon npm install.
* To build the frontend dependencies after modifying them use `npm run-script build`.
* **NOTE:** If you get a wd error during installing or building the frontend dependencies please append `--unsafe-perm` to the commands.
* If adding new features please make sure to write tests for them if they don't already exist. Examples can be seen in the test directory for ESLint and Koa routes.
* Before submitting your code make sure to run `NODE_ENV=test npm test` to make sure that everything passes.


### Testing

* We utilize [Mocha](http://mochajs.org/) & [Chai](http://chaijs.com/) with [Supertest](https://npmjs.com/package/supertest) and [ESLint](https://eslint.org) to provide testing.

* For Testing please run `NODE_ENV=test npm install` to install dependencies and `NODE_ENV=test npm test` to test the source code.
