const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
  });

  UserSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model('User', UserSchema, 'users'); // Add 'users' as the third argument
  