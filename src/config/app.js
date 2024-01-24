const express = require('express');
const cors = require('cors');
const userAgent = require('express-useragent');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');
const requestIp = require('request-ip');
const { expressRateLimit } = require('../middlewares/expressRateLimit');
const { expressUserAgent } = require('../middlewares/expressUserAgent');
const bodyParser = require('body-parser');

// const { optionsSwaggerUI, swaggerSpec } = require('~/core/modules/docsSwagger');
const indexRoutes = require('../routes');
const { env } = require('./env');
const { NotFound } = require('../core/response/errorResponse');

/**
 * Initialize Bootsrap Application
 */
class App {
    constructor() {
        this._app = express();
        this._port = env.APP_PORT;

        this._plugins();
        this._routes();
    }

    /**
     * Initialize Plugins
     */
    _plugins() {
        this._app.use(helmet());
        this._app.use(cors());
        this._app.use(express.json({ limit: '200mb', type: 'application/json' }));
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(express.static(path.resolve(`${__dirname}/../../public`)));
        this._app.use(hpp());
        this._app.use(requestIp.mw());
        this._app.use(userAgent.express());

        this._app.set('view engine', 'ejs');
        this._app.use(bodyParser.json());
        // middleware
        this._app.use(expressRateLimit());
        this._app.use(expressUserAgent());
    }

    /**
     * Initialize Routes
     */
    _routes() {
        this._app.use(indexRoutes);

        // Catch error 404 endpoint not found
        this._app.use('*', function (req, _res) {
            const method = req.method;
            const url = req.originalUrl;
            const host = req.hostname;

            const endpoint = `${host}${url}`;

            throw new NotFound(
                `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
            );
        });
    }

    /**
     * Create Bootstrap App
     */
    create() {

        // set port
        this._app.set('port', this._port);

        // return this application
        return this._app;
    }
}

module.exports = { App };