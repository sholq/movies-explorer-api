const { celebrate, Joi } = require('celebrate');

const signInRouter = require('express').Router();

const { login } = require('../controllers/auth');

signInRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = { signInRouter };
