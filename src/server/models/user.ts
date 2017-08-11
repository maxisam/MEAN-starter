import { generatePasswordHash } from '../authentication/password.helper';
import * as mongoose from 'mongoose';
// import * as passportLocalMongoose from 'passport-local-mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

const SALT_FACTOR = 10;
const Schema = mongoose.Schema;
export interface IUser {
    account: string,
    password: string,
    role: string
}

const USER_SCHEMA = new Schema({
    account: { type: String, unique: true, lowercase: true },
    password: String,
    role: String
});

// ? USER_SCHEMA.plugin(passportLocalMongoose);

// Before saving a model, encrypt the password
USER_SCHEMA.pre('save', function (next) {
    // get access to the user model
    const user = this;
    generatePasswordHash(user.password, (error, passwordHash) => {
        if (error) { return next(error); }
        // overwrite plain text password with encrypted password
        user.password = passwordHash;
        next();
    });
});

export const User = mongoose.model('users', USER_SCHEMA);
