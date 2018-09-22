const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  _id:        String, // !
  timestamp:  Number, // !
  doctorId:   String, // !
  stepId:     String, // !
  patientId:  String, // !
  roomId:     String, // !
  content:    String,
  isEnabled:  Boolean
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
