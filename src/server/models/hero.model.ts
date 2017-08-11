import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HERO_SCHEMA = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    saying: String
  },
  {
    collection: 'heroes',
    read: 'nearest'
  }
);

export const Hero = mongoose.model('Hero', HERO_SCHEMA);


