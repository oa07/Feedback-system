const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },

  verifyAccountToken: {
    type: String
  },
  isAccountVerified: {
    type: Boolean,
    default: false
  },
  isAccountActive: {
    type: Boolean,
    default: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

AccountSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
module.exports.AccountModel = mongoose.model('Account', AccountSchema);
