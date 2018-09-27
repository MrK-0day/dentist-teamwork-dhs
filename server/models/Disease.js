const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiseaseSchema = new Schema({
  _id:       String, // !
  name:      String, // !
  isEnabled: Boolean // !
})

module.exports = mongoose.model('Disease', DiseaseSchema)
