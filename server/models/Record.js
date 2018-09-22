const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  _id:          String, // !
  patientid:    String, // !
  recordnumber: Number, // !
  no:           Number, // !
  teeth:        Array, // !
  cost:         Number, // !
  paid:         Number,
  createddate:  Number, // !
  treatment:    String, // !
  doctorid:     String, // !
  isEnabled:    Boolean // !
})

module.exports = mongoose.model('Record', RecordSchema)
