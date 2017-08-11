import { MongoDBStore } from './mongo';
import { router } from './routes';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';  // compresses requests
import * as express from 'express';
import * as session from 'express-session';
import * as errorHandler from 'errorhandler';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as flash from 'express-flash';
import * as passport from 'passport';
import * as morgan from 'morgan'; // logger
import * as mongoose from 'mongoose';
import * as path from 'path';
import expressValidator = require('express-validator');
// ToDo: use cors?
// const cors = require('cors');

/**
 * API keys and Passport configuration.
 */
// import * as passportConfig from "./config/passport";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

// session store, use connect-redis
// const MongoStore = mongo(session);
/**
 * Create Express server.
 */
export const app = express();
const root = './';
const port = process.env.PORT || '3000';
/**
 * Connect to MongoDB.
 */
const mongo = new MongoDBStore();
mongo.dbConnect();

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(express.static(path.join(root, 'public'), { maxAge: 31557600000 }));

app.use('/api', router);
app.get('*', (req, res) => {
    res.sendFile('public/index.html', { root: root });
});

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

// Enable CORS from client-side
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.listen(port, () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), port, app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
module.exports = app;
