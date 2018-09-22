const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema({
  _id:            String, // !
  fullname:       String, // !
  gender:         String,
  dob:            String,
  career:         String,
  address:        String,
  phone:          String, // !
  email:          String,
  nationality:    String,
  refby:          String,
  medicalhistory: Array,
  isEnabled:      Boolean // !
})

module.exports = mongoose.model('Patient', PatientSchema)
