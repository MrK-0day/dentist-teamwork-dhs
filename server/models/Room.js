const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  _id:        String,
  code:       String,
  name:       String,
  width:      Number,
  length:     Number,
  isEnabled:  Boolean
})

module.exports = mongoose.model('Room', RoomSchema)
