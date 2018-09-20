const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  _id:          String,
  recordnumber: Number,
  no:           Number,
  cost:         Number,
  paid:         Number,
  datecreated:  Date,
  teeth:        Array,
  treatment:    String,
  isEnabled:    Boolean
})

module.exports = mongoose.model('Record', RecordSchema)
