const { gql, ApolloError } = require('apollo-server-express')
// const pubsub = new PubSub()
// const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const _ = require('lodash')

// models
const Disease = require('./models/Disease')
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const Record = require('./models/Record')
const Room = require('./models/Room')
const Schedule = require('./models/Schedule')
const Step = require('./models/Step')
const Treatment = require('./models/Treatment')

const checkTruthy = (value) => value ? true : false

const typeDefs = gql`
  type Disease {
    _id:            ID
    name:           String
    isEnabled:      Boolean
  }
  type Doctor {
    _id:            ID
    fullname:       String
    specialize:     String
    phone:          String
    isEnabled:      Boolean
    records:        [Record]
    schedules:      [Schedule]
  }
  type Patient {
    _id:            ID
    fullname:       String
    gender:         String
    dob:            String
    career:         String
    address:        String
    phone:          String
    nationality:    String
    email:          String
    refBy:          String
    medicalHistory: [String]
    isEnabled:      Boolean
    records:        [Record]
    schedules:      [Schedule]
  }
  type Record {
    _id:            ID
    patientId:      String
    recordNumber:   String
    no:             Int
    teeth:          String
    cost:           String
    paid:           String
    createdDate:    Int
    treatment:      String
    doctorId:       String
    isEnabled:      Boolean
    doctor:         Doctor
    patient:        Patient
    steps:          [Step]
  }
  type Room {
    _id:            ID
    code:           String
    name:           String
    isEnabled:      Boolean
    schedules:      [Schedule]
  }
  type Schedule {
    _id:            ID
    timestamp:      Int
    doctorId:       String
    stepId:         String
    patientId:      String
    roomId:         String
    content:        String
    isEnabled:      Boolean
    doctor:         Doctor
    patient:        Patient
    room:           Room
    step:           Step
  }
  type Step {
    _id:            ID
    recordId:       String
    code:           String
    name:           String
    content:        String
    state:          Int
    isEnabled:      Boolean
    record:         Record
    schedules:      [Schedule]
  }
  type Treatment {
    _id:            ID
    diseaseId:      String
    content:        String
    isEnabled:      Boolean
    disease:        Disease
  }

  type Query {
    disease(_id: ID!):    Disease
    getDiseases:       [Disease]
    doctor(_id: ID!):     Doctor
    getDoctors:          [Doctor]
    patient(_id: ID!):    Patient
    getPatients:         [Patient]
    record(_id: ID!):     Record
    getRecords:          [Record]
    room(_id: ID!):       Room
    getRooms:            [Room]
    schedule(_id: ID!):   Schedule
    getSchedules:        [Schedule]
    step(_id: ID!):       Step
    getSteps:            [Step]
    treatment(_id: ID!):  Treatment
    getTreatments:     [Treatment]
  }

  type Mutation {
    # reset Data
    resetAll(confirm: String!): Boolean

    #Disease
    addDisease(name: String!): Disease
    updateDisease(_id: ID!, name: String!): Disease
    removeDisease(_id: ID!): Disease

    # Doctor
    addDoctor(fullname: String!, specialize: String, phone: String!): Doctor
    updateDoctor(_id: ID!, fullname: String!, specialize: String, phone: String!): Doctor
    removeDoctor(_id: ID!): Doctor

    # Patient
    addPatient(fullname: String!, gender: String, dob: String, career: String, address: String, phone: String!, nationality: String, email: String, refBy: String, medicalHistory: [String]): Patient
    updatePatient(_id: ID!, fullname: String!, gender: String, dob: String, career: String, address: String, phone: String!, nationality: String, email: String, refBy: String, medicalHistory: [String]): Patient
    removePatient(_id: ID!): Patient

    # Record
    addRecord(patientId: String!, recordNumber: String!, cost: String!, teeth: String!, paid: String, createdDate: Int!, treatment: String!, doctorId: String!): Record
    updateRecord(_id: ID!, patientId: String!, recordNumber: String!, cost: String! no: String!, teeth: String!, paid: String, createdDate: Int!, treatment: String!, doctorId: String!): Record
    removeRecord(_id: ID!): Record

    # Room
    addRoom(code: String!, name: String!): Room
    updateRoom(_id: ID!, code: String!, name: String!): Room
    removeRoom(_id: ID!): Room

    # Schedule
    addSchedule(timestamp: Int!, doctorId: String!, stepId: String!, patientId: String!, roomId: String!, content: String): Schedule
    updateSchedule(_id: ID!, timestamp: Int!, doctorId: String!, stepId: String!, patientId: String!, roomId: String!, content: String): Schedule
    removeSchedule(_id: ID!): Schedule

    # Step
    addStep(recordId: String!, code: String!, name: String!, content: String): Step
    updateStep(_id: ID!, recordId: String!, code: String!, name: String!, content: String, state: Int!): Step
    removeStep(_id: ID!): Step

    #Treatment
    addTreatment(diseaseId: String!, content: String!): Treatment
    updateTreatment(_id: ID!, diseaseId: String!, content: String!): Treatment
    removeTreatment(_id: ID!): Treatment
  }
`

const resolvers = {
  Query: {
    disease:        (root, args, context, info) => Disease.findById(args._id),
    getDiseases:    (root, args, context, info) => Disease.find({ isEnabled: true }),
    doctor:         (root, args, context, info) => Doctor.findById(args._id),
    getDoctors:     (root, args, context, info) => Doctor.find({ isEnabled: true }),
    patient:        (root, args, context, info) => Patient.findById(args._id),
    getPatients:    (root, args, context, info) => Patient.find({ isEnabled: true }),
    record:         (root, args, context, info) => Record.findById(args._id),
    getRecords:     (root, args, context, info) => Record.find({ isEnabled: true }),
    room:           (root, args, context, info) => Room.findById(args._id),
    getRooms:       (root, args, context, info) => Room.find({ isEnabled: true }),
    schedule:       (root, args, context, info) => Schedule.findById(args._id),
    getSchedules:   (root, args, context, info) => Schedule.find({ isEnabled: true }),
    step:           (root, args, context, info) => Step.findById(args._id),
    getSteps:       (root, args, context, info) => Step.find({ isEnabled: true }),
    treatment:      (root, args, context, info) => Treatment.findById(args._id),
    getTreatments:  (root, args, context, info) => Treatment.find({ isEnabled: true })
  },

  Doctor: {
    records (doctor) {
      return Record.find({ doctorId: doctor._id, isEnabled: true })
    },
    schedules (doctor) {
      return Schedule.find({ doctorId: doctor._id, isEnabled: true })
    }
  },

  Patient: {
    records (patient) {
      return Record.find({ patientId: patient._id, isEnabled: true })
    },
    schedules (patient) {
      return Schedule.find({ patientId: patient._id, isEnabled: true })
    }
  },

  Record: {
    steps (record) {
      return Step.find({ recordId: record._id, isEnabled: true })
    },
    patient (record) {
      return Patient.findById(record.patientId)
    }
  },

  Room: {
    schedules (room) {
      return Schedule.find({ roomId: room._id, isEnabled: true })
    }
  },

  Schedule: {
    doctor (schedule) {
      return Doctor.findById(schedule.doctorId)
    },
    patient (schedule) {
      return Patient.findById(schedule.patientId)
    },
    room (schedule) {
      return Room.findById(schedule.roomId)
    },
    step (schedule) {
      return Step.findById(schedule.stepId)
    }
  },

  Step: {
    record (step) {
      return Record.findById(step.recordId)
    },
    schedules (step) {
      return Schedule.find({ stepId: step._id, isEnabled: true })
    }
  },

  Treatment: {
    disease (treatment) {
      return Disease.findById(treatment.diseaseId)
    }
  },

  Mutation: {
    // RESET DATA
    resetAll: (root, args) => {
      if (args.confirm === 'yes') {
        Doctor.deleteMany({}).exec()
        Patient.deleteMany({}).exec()
        Record.deleteMany({}).exec()
        Room.deleteMany({}).exec()
        Schedule.deleteMany({}).exec()
        Step.deleteMany({}).exec()
        return true
      }
      return false
    },

    // DISEASE
    addDisease: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newDisease = new Disease(args)
      return newDisease.save()
    },
    updateDisease: (root, args) => Disease.findOneAndUpdate({ _id: args._id }, args),
    removeDisease: (root, args) => Disease.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // DOCTOR
    addDoctor: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newDoctor = new Doctor(args)
      return newDoctor.save()
    },
    updateDoctor: (root, args) => Doctor.findOneAndUpdate({ _id: args._id }, args),
    removeDoctor: (root, args) => Doctor.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // PATIENT
    addPatient: (root, args) => {
      // generate ID
      args._id = mongoose.Types.ObjectId()

      // FIXME: validate
      Object.keys(args).forEach(function (key) {
        if (key === `fullname` || key === `phone`) {
          if(!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      args.isEnabled = true
      let newPatient = new Patient(args)
      return newPatient.save()
    },
    updatePatient: (root, args) => {
      // FIXME: validate
      Object.keys(args).forEach(function (key) {
        if (key === `fullname` || key === `phone`) {
          if(!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      return Patient.findOneAndUpdate({ _id: args._id }, args)
    },
    removePatient: (root, args) => Patient.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // RECORD
    addRecord: (root, args) => {
      async function validateData () {
        // FIXME: validate
        Object.keys(args).forEach(function (key) {
          if (key !== `paid`) {
            if(!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
          }
        })

        const patientCount = await Patient.countDocuments({_id: args.patientId})
        if (patientCount === 0) throw new ApolloError('Patient does not exist', 400)

        const doctorCount = await Doctor.countDocuments({_id: args.doctorId})
        if (doctorCount === 0) throw new ApolloError('Doctor does not exist', 400)

        args._id = mongoose.Types.ObjectId()
        args.no = 0
        args.teeth = teethArr
        args.isEnabled = true
        let newRecord = new Record(args)
        return newRecord.save()
      }
      return validateData()
    },
    updateRecord: (root, args) => {
      // FIXME: validate
      Object.keys(args).forEach(function (key) {
        if (key !== `paid`) {
          if(!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      return Record.findOneAndUpdate({ _id: args._id }, args)
    },
    removeRecord: (root, args) => Record.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // ROOM
    addRoom: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newRoom = new Room(args)
      return newRoom.save()
    },
    updateRoom: (root, args) => Room.findOneAndUpdate({ _id: args._id }, args),
    removeRoom: (root, args) => Room.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // SCHEDULE
    addSchedule: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newSchedule = new Schedule(args)
      return newSchedule.save()
    },
    updateSchedule: (root, args) => Schedule.findOneAndUpdate({ _id: args._id }, args),
    removeSchedule: (root, args) => Schedule.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // STEP
    addStep: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.state = 0
      args.isEnabled = true
      let newStep = new Step(args)
      return newStep.save()
    },
    updateStep: (root, args) => Step.findOneAndUpdate({ _id: args._id }, args),
    removeStep: (root, args) => Step.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // TREATMENT
    addTreatment: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newTreatment = new Treatment(args)
      return newTreatment.save()
    },
    updateTreatment: (root, args) => Treatment.findOneAndUpdate({ _id: args._id }, args),
    removeTreatment: (root, args) => Treatment.findOneAndUpdate({ _id: args._id }, { isEnabled: false })
  }
}

module.exports = { typeDefs, resolvers }
