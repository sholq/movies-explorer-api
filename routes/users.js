const { celebrate, Joi } = require('celebrate');

const usersRouter = require('express').Router();

const {
  getUsers, updateProfile, getProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getProfile);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = { usersRouter };
