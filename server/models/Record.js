const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  _id:          String, // !
  patientId:    String, // !
  recordNumber: Number, // !
  no:           Number, // !
  teeth:        Array, // !
  cost:         Number, // !
  paid:         Number,
  createdDate:  Number, // !
  treatment:    String, // !
  doctorId:     String, // !
  isEnabled:    Boolean // !
})

module.exports = mongoose.model('Record', RecordSchema)
