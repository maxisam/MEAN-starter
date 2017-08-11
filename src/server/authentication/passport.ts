import { jwtStrategy } from './strategy/jwt.strategy';
import { localStrategy } from './strategy/local.strategy';
import * as passport from 'passport';

passport.use(jwtStrategy);
passport.use(localStrategy);

// Middleware to require login/auth

export const authMiddleware = passport.authenticate('jwt', { session: false });
export const loginMiddleware = passport.authenticate('local', { session: false });
