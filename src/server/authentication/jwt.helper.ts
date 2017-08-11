import { IUser } from '../models/user';
import { AUTH_CONFIG } from './auth.config';
import * as jwt from 'jsonwebtoken';

const EXPIRES_IN = 600000;

// Generate an Access Token for the given User ID
export const generateJWT = (user: IUser) => {
    const token = jwt.sign(<object>{
        account: user.account,
        role: user.role
    },
        AUTH_CONFIG.token.secret.default,
        {
            expiresIn: EXPIRES_IN,
            audience: AUTH_CONFIG.token.audience.default,
            issuer: AUTH_CONFIG.token.issuer.default,
            subject: user.account
        });

    return token;
}
