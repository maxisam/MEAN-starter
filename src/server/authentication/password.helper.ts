import * as bcrypt from 'bcrypt-nodejs';
import { NativeError } from 'mongoose';

const SALT_FACTOR = 10;

export const validPassword = (candidatePassword: string, passwordHash: string, callback: (error: Error, result: boolean) => void) => {
    bcrypt.compare(candidatePassword, passwordHash, (err, isMatch) => {
        return callback(err, isMatch);
    });
};

export const generatePasswordHash = (password: string, callback: (error: Error, result?: string) => void) => {
    // generate a salt then run callback
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) { return callback(error, undefined); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(password, salt, () => { }, callback);
    });
}
