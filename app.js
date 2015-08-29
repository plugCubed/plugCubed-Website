'use strict';

const koa = require('koa');
const app = module.exports = koa();
const chalk = require('chalk');
const conditional = require('koa-conditional-get');
const errorHandler = require('./middleware/error');
const etag = require('koa-etag');
const he = require('he');
const i18n = require('koa-i18n');
const langMap = require('./locales/languages.json');
const locale = require('koa-locale');
const logger = require('./lib/logger');
const koaLogger = require('jethro-koa');
const moment = require('moment');
const packInfo = require('./package.json');
const path = require('path');
const render = require('koa-ejs');
const router = require('./routes');
const serveStatic = require('koa-serve-static');
const xRequestId = require('koa-x-request-id');
/* istanbul ignore next: This is only to disable logging when testing. */
if (process.env.NODE_ENV !== 'test') {
    app.use(koaLogger());
}

locale(app);

app.use(/** @this Koa  */ function *(next) {
    let url = this.path.replace('/', '').toLowerCase();
    if (url === '') url = 'index';
    const title = `${url.charAt(0).toUpperCase()}${url.slice(1)}`;
    this.state.he = he;
    this.state.i18n = this.i18n;
    this.state.locale = this.cookies.get('locale');
    this.state.langs = Object.keys(this.i18n.locales);
    this.state.languages = [];
    for (let i = 0; i < this.state.langs.length; i++) {
        const lang = langMap[this.state.langs[i]];
        /* istanbul ignore next: Not possible to test yet.*/
        if (lang == null) continue;
        this.state.languages.push(lang.nativeName + ' / ' + lang.englishName);
    }
    this.state.moment = moment;
    this.state.page = url;
    this.state.title = title;
    yield next;
});

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});

app.use(errorHandler);

app.use(i18n(app, {
    directory: './locales',
    extension: '.json',
    locales: ['en', 'cs', 'es', 'fr', 'hr', 'ms', 'sl', 'tr', 'zh'],
    modes: [
        'query',
        'cookie',
        'header',
        'url'
    ]
}));

app.use(xRequestId(app, {
    inject: true
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(conditional());

app.use(etag());

app.use(serveStatic(path.join(__dirname, 'public'), {
    index: false,
    maxAge: '1d'
}));

app.name = 'p3Site';
/* istanbul ignore next: Not needed to be tested, just logs info */
app.listen(process.env.PORT || 7001, function() {
    logger('info', 'Web', chalk.cyan('Started: ') + packInfo.name + chalk.cyan(' Version: ') + packInfo.version);
});
