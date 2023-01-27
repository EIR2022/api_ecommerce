const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  codeverification: String,
  sessiontoken: [{ token: String }],
  profile: {
    name: {
      first: String,
      last: String,
    },
    nit: String,
    phones: [String],
    address: [
      {
        nameaddress: String,
        streetaddress: String,
        departament: String,
        municipio: String,
      },
    ],
    imgProfile: {
      type: mongoose.ObjectId,
      ref: 'Image',
    },
  },
  validationAttempts: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
