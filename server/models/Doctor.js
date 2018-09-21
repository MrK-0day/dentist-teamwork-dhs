const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DoctorSchema = new Schema({
  _id:        String, // !
  fullname:   String, // !
  specialize: String,
  phone:      String,
  isEnabled:  Boolean // !
})

module.exports = mongoose.model('Doctor', DoctorSchema)
