import { generateJWT } from '../authentication/jwt.helper';
import { IUser, User } from '../models/user';
import { MongoDBStore } from '../mongo';
import { ReadPreference } from 'mongodb';
import * as passport from 'passport';

export class UserController {
    constructor() {
        // const mongo = new MongoDBStore();
        // mongo.dbConnect();
    }
    register(req, res, next) {
        const userDoc = new User({
            account: req.body.account,
            password: req.body.password
        });

        userDoc.save((err, user: IUser) => {
            if (err) { return next(err); }
            // Respond with JWT if user was created
            res.status(200).json({
                token: generateJWT(user)
            });
        });
    }

    login(req, res, next) {
        res.status(200).json({
            token: generateJWT(req.user)
        });
    };

}
