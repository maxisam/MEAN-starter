import { MONGO_URI } from './env/database.mlab';
// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
(<any>mongoose).Promise = global.Promise;
// tslint:disable-next-line:max-line-length
export class MongoDBStore {
  connect: mongoose.MongooseThenable;
  dbConnect() {
    this.connect = mongoose.connect(MONGO_URI, { useMongoClient: true });
    mongoose.connection.on('error', () => {
      console.log('MongoDB connection error. Please make sure MongoDB is running.');
      process.exit();
    })
    return this.connect;
  }
}
