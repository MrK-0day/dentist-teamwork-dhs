const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TreatmentRegimentSchema = new Schema({
  _id:       String, // !
  diseaseId: String, // !
  content:   String, // !
  isEnabled: Boolean // !
})

module.exports = mongoose.model('TreatmentRegimen', TreatmentRegimentSchema)
