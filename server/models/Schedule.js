const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  _id:        String,
  roomId:     String,
  seatId:     String,
  timestamp:  Number,
  patientid:  String
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
