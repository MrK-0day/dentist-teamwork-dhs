const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StepSchema = new Schema({
  _id:        String, // !
  code:       String, // !
  name:       String,
  content:    String,
  state:      Number, // !
  isEnabled:  Boolean // !
})

module.exports = mongoose.model('Step', StepSchema)
