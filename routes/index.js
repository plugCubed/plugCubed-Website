'use strict';

/* Route Dependencies */

const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

/* Route Files */
/**
 * Disabled Routes Due to RIP Plug.dj.
 * Files:
 * const alpha = require('./alpha');
 * const donations = require('./donations');
 * const index = require('./index/');
 * Routes:
 * router.get('/alpha', alpha);
 * router.get('/donations', donations);
 */

const about = require('./about');
const ambassadors = require('./ambassadors');
const alpha = require('./alpha');
const commands = require('./commands');
const donations = require('./donations');
const features = require('./features');
const goodbye = require('./goodbye');
const index = require('./index/');
const install = require('./install');
const lang = require('./lang');
const license = require('./license');
const readme = require('./readme');
const roomsettings = require('./roomsettings');
const translate = require('./translate');

/* Routes */
router.get('/', index);
router.get('/about', about);
router.get('/alpha', alpha);
router.get('/ambassadors', ambassadors);
router.get('/commands', commands);
router.get('/donations', donations);
router.get('/features', features);
router.get('/goodbye', goodbye);
router.get('/install', install);
router.post('/lang', bodyParser(), lang);
router.get('/license', license);
router.get('/readme', readme);
router.get('/roomsettings', roomsettings);
router.get('/translate', translate);

module.exports = router;
