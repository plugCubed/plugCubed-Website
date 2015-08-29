'use strict';

/* Route Dependencies */

const bodyParser = require('koa-body-parser');
const router = require('koa-router')();

/* Route Files */
const about = require('./about');
const alpha = require('./alpha');
const ambassadors = require('./ambassadors');
const commands = require('./commands');
const donations = require('./donations');
const features = require('./features');
const index = require('./index/');
const install = require('./install');
const lang = require('./lang');
const license = require('./license');
const readme = require('./readme');
const translate = require('./translate');

/* Routes */
router.get('/', index);
router.get('/about', about);
router.get('/alpha', alpha);
router.get('/ambassadors', ambassadors);
router.get('/commands', commands);
router.get('/donations', donations);
router.get('/features', features);
router.get('/install', install);
router.post('/lang', bodyParser(), lang);
router.get('/license', license);
router.get('/readme', readme);
router.get('/translate', translate);

module.exports = router;
