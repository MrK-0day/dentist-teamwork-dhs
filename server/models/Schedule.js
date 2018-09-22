const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  _id:        String, // !
  timestamp:  Number, // !
  doctorid:   String, // !
  stepid:     String, // !
  patientid:  String, // !
  roomId:     String, // !
  content:    String,
  isEnabled:  Boolean
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
