import * as LocalStrategy from 'passport-local';
import { IStrategyOptions } from 'passport-local';

import { User } from '../../models/user';
import { validPassword } from '../password.helper';

const localOptions: IStrategyOptions = {
    usernameField: 'account'
};

export const localStrategy = new LocalStrategy.Strategy(localOptions, (account, password, done) => {
    User.findOne({ account: account.toLowerCase() }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }

        validPassword(password, user.password, (error, isMatch) => {
            if (error) { return done(error); }
            if (!isMatch) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }

            return done(null, user);
        });
    });
});

