import { loginMiddleware } from '../authentication/passport';
import { UserController } from '../controllers/user.controller';
import * as express from 'express';

export const authRoutes = express.Router();
const userController = new UserController();

authRoutes.post('/login', loginMiddleware, (req, res, next) => {
    userController.login(req, res, next);
});

authRoutes.post('/register', (req, res, next) => {
    userController.register(req, res, next);
});

// authRoutes.post('/status', (req, res) => {
//     userController.status(req, res);
// });
