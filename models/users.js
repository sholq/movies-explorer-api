const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

// const AuthError = require('../errors/auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Антон Долин',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validation: [isEmail, 'Некорректные данные'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email })
//     .select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new AuthError('Неправильные почта или пароль'));
//       }
//
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new AuthError('Неправильные почта или пароль'));
//           }
//
//           return user;
//         });
//     });
// };

module.exports.User = mongoose.model('user', userSchema);
