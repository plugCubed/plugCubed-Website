#plug&#179; Website (plugCubed Website) [![Build Status](https://img.shields.io/travis/plugCubed/plugCubed-Website.svg)](https://travis-ci.org/plugCubed/plugCubed-Website) [![Code Coverage](https://img.shields.io/coveralls/plugCubed/plugCubed-Website.svg)](https://coveralls.io/plugCubed/plugCubed-website) [![David](https://img.shields.io/david/plugcubed/plugCubed-Website.svg)](https://david-dm.org/plugcubed/plugCubed-Website) [![Gratipay](https://img.shields.io/gratipay/thedark1337.svg)](https://www.gratipay.com/thedark1337/)

### Information / Installation
This is the repository for plug&#179;'s website. We are currently using [KoaJS](https://github.com/koajs/koa) as the server.

**Dependencies:**

* [Node.JS](http://nodejs.org/download/) OR [io.js](https://iojs.org).

* **Note**: if using Node.js it must be v0.11.6 or higher with the `--harmony flag` for generators support. For ease of use we have `npm start` with -`-harmony` included.
* **Note 2**: Due to Koa-Frouter's usage of invalid file names, Windows is not compatible for development purposes

### Developers

* [Thomas "TAT" Andresen](https://github.com/TATDK)
* [Sam "Henchman" Mills](https://github.com/Hunchmun)
* [Alex "Thedark1337" Pham](https://github.com/thedark1337)

### Testing

We utilize [Mocha](http://mochajs.org/) & [Chai](http://chaijs.com/) with [Supertest](https://npmjs.com/package/supertest) and [ESLint](https://eslint.org) to provide testing.

For Testing please run `NODE_ENV=test npm install` and `npm test`.

### Contributions

* We welcome all contributions to this project.
* Please make sure it follows the same codestyle as it currently is.
* We utilize [JSPM](https://jspm.io) as our frontend package manager and included a postinstall to install and bundle dependencies upon npm install.
**NOTE: ** If JSPM doesn't bundle due to wd error from npm, please use ` npm install --unsafe-perm `

### Translation

Please use  [CrowdIn]() for any translations.

### License
Copyright &copy; 2015 The plug&#179; Team and other contributors

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
