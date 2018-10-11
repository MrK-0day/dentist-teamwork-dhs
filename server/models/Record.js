const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  _id: String, // !
  patientId: String, // !
  recordNumber: String, // !
  no: Number, // !
  teeth: String, // !
  cost: String, // !
  paid: String,
  createdDate: Number, // !
  treatment: String, // !
  doctorId: String, // !
  isEnabled: Boolean // !
})

module.exports = mongoose.model('Record', RecordSchema)
