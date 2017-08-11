import { HeroController } from './controllers/hero.controller';
import { authRoutes } from './router/auth.router';
import * as express from 'express';

export const router = express.Router();

const heroController = new HeroController();


router.get('/heros', (req, res) => {
  heroController.getHeroes(req, res);
});

router.use('/auth', authRoutes);
