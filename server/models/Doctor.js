const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DoctorSchema = new Schema({
  _id:            String, // !
  username:       String, // !
  password:       String, // !
  fullname:       String, // !
  specialize:     String,
  gender:         String,
  dob:            String,
  address:        String,
  phone:          String, // !
  email:          String,
  nationality:    String,
  refBy:          String,
  medicalHistory: Array,
  isEnabled:      Boolean // !
})

module.exports = mongoose.model('Doctor', DoctorSchema)
