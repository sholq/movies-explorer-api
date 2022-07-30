const { celebrate, Joi } = require('celebrate');

const signUpRouter = require('express').Router();

const { createUser } = require('../controllers/auth');

signUpRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = { signUpRouter };
