const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = new Schema({
  department: String,
  municipios: [String],
});

module.exports = mongoose.model('Community', communitySchema);
