import { Hero } from '../models/hero.model';
import { ReadPreference } from 'mongodb';
// const ReadPreference = require('mongodb').ReadPreference;

export class HeroController {
  constructor() {
    // const mongo = new MongoDBStore();
    // mongo.dbConnect();
  }
  getHeroes(req, res) {
    const docQuery = Hero.find({}).read(ReadPreference.NEAREST);
    docQuery
      .exec()
      .then(heroes => {
        res.status(200).json(heroes);
      })
      .catch(error => {
        res.status(500).send(error);
        return;
      });
  }

  postHeroes(req, res) {
    const originalHero = { id: req.body.id, name: req.body.name, saying: req.body.saying };
    const hero = new Hero(originalHero);
    hero.save(error => {
      if (this.checkServerError(res, error)) { return };
      res.status(201).json(hero);
      console.log('Hero created successfully!');
    });
  }

  putHero(req, res) {
    const originalHero = {
      id: parseInt(req.params.id, 10),
      name: req.body.name,
      saying: req.body.saying
    };
    Hero.findOne({ id: originalHero.id }, (error, hero: any) => {
      if (this.checkServerError(res, error)) { return };
      if (!this.checkFound(res, hero)) { return };

      hero.name = originalHero.name;
      hero.saying = originalHero.saying;
      hero.save(err => {
        if (this.checkServerError(res, err)) { return };
        res.status(200).json(hero);
        console.log('Hero updated successfully!');
      });
    });
  }

  deleteHero(req, res) {
    const id = parseInt(req.params.id, 10);
    Hero.findOneAndRemove({ id: id })
      .then(hero => {
        if (!this.checkFound(res, hero)) { return };
        res.status(200).json(hero);
        console.log('Hero deleted successfully!');
      })
      .catch(error => {
        if (this.checkServerError(res, error)) { return };
      });
  }

  checkServerError(res, error) {
    if (error) {
      res.status(500).send(error);
      return error;
    }
  }
  checkFound(res, hero) {
    if (!hero) {
      res.status(404).send('Hero not found.');
      return;
    }
    return hero;
  }
}
