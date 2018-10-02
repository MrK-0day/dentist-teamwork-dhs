const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TreatmentStepSchema = new Schema({
  _id:                String, // !
  treatmentRegimenId: String, // !
  content:            String, // !
  isEnabled:          Boolean // !
})

module.exports = mongoose.model('TreatmentStep', TreatmentStepSchema)
