const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/auth-error');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id, name: user.name, email: user.email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      let token;
      try {
        token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
      } catch (err) {
        return next(new AuthError(err.message));
      }

      return res.send({ token, message: 'Вы вошли' });
    })
    .catch(next);
};
