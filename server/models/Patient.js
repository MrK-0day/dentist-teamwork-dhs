const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema({
  _id:            String,
  fullname:       String,
  gender:         String,
  dob:            Date,
  career:         Number,
  address:        String,
  phone:          Array,
  nationality:    String,
  email:          String,
  refby:          String,
  medicalrecord:  Array,
  isEnabled:      Boolean
})

module.exports = mongoose.model('Patient', PatientSchema)
