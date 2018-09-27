const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TreatmentSchema = new Schema({
  _id:       String, // !
  diseaseId: String, // !
  content:   String, // !
  isEnabled: Boolean // !
})

module.exports = mongoose.model('Treatment', TreatmentSchema)
