const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  module.exports = mongoose.model('Contact', ContactSchema, 'contacts');

