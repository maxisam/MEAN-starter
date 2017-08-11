import { User } from '../../models/user';
import { AUTH_CONFIG } from '../auth.config';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';


export const jwtOptions = <passportJwt.StrategyOptions>{
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: AUTH_CONFIG.token.secret.default,
    issuer: AUTH_CONFIG.token.issuer.default,
    audience: AUTH_CONFIG.token.audience.default
};
// Setting up JWT login strategy

export const jwtStrategy = new passportJwt.Strategy(jwtOptions, (payload, done) => {
    // TODO: check jwt
    User.findOne({ email: payload.email }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }
        return done(null, user, payload);
    });
});
