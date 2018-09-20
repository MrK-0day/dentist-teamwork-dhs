const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StepSchema = new Schema({
  _id:        String,
  stepnumber: Number,
  content:    String,
  state:      Array,
  isEnabled:  Boolean
})

module.exports = mongoose.model('Step', StepSchema)
