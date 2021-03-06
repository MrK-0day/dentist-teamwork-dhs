const { gql, ApolloError } = require('apollo-server-express')
// const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// const SHA256 = require('crypto-js/sha256')
// const _ = require('lodash')

// models
const Disease = require('./models/Disease')
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const Record = require('./models/Record')
const Room = require('./models/Room')
const Schedule = require('./models/Schedule')
const Step = require('./models/Step')
const TreatmentRegimen = require('./models/TreatmentRegimen')
const TreatmentStep = require('./models/TreatmentStep')

const checkTruthy = (value) => value || false

const typeDefs = gql`
  type Disease {
    _id:                ID
    name:               String
    isEnabled:          Boolean
    treatmentRegimens:  [TreatmentRegimen]
  }
  type Doctor {
    _id:            ID
    username:       String
    password:       String
    fullname:       String
    token:          String
    specialize:     String
    gender:         String
    dob:            String
    address:        String
    phone:          String
    email:          String
    nationality:    String
    refBy:          String
    medicalHistory: [String]
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
  type TreatmentRegimen {
    _id:            ID
    diseaseId:      String
    content:        String
    isEnabled:      Boolean
    disease:        Disease
    treatmentSteps: [TreatmentStep]
  }
  type TreatmentStep {
    _id:                ID
    treatmentRegimenId: String
    content:            String
    isEnabled:          String
    treatmentRegimen:   TreatmentRegimen
  }

  type Query {
    disease(_id: ID!):           Disease
    getDiseases:                [Disease]
    doctor(_id: ID!):            Doctor
    getDoctors:                 [Doctor]
    patient(_id: ID!):           Patient
    getPatients:                [Patient]
    record(_id: ID!):            Record
    getRecords:                 [Record]
    room(_id: ID!):              Room
    getRooms:                   [Room]
    schedule(_id: ID!):          Schedule
    getSchedules:               [Schedule]
    step(_id: ID!):              Step
    getSteps:                   [Step]
    treatmentRegimen(_id: ID!):  TreatmentRegimen
    getTreatmentRegimens:       [TreatmentRegimen]
    treatmentStep(_id: ID!):     TreatmentStep
    getTreatmentSteps:          [TreatmentStep]

    # Login
    signIn(username: String!, password: String!): Doctor
  }

  type Mutation {
    # reset Data
    resetAll(confirm: String!): Boolean

    # change Password
    changePassword(_id: ID!, password: String!): Doctor

    #Disease
    addDisease(name: String!): Disease
    updateDisease(_id: ID!, name: String!): Disease
    removeDisease(_id: ID!): Disease

    # Doctor
    addDoctor(username: String!, password: String!, fullname: String!, specialize: String!, gender: String, dob: String, address: String, phone: String!, email: String, nationality: String, refBy: String, medicalHistory: [String]): Doctor
    updateDoctor(_id: ID!, fullname: String!, specialize: String!, gender: String, dob: String, address: String, phone: String!, email: String, nationality: String, refBy: String, medicalHistory: [String]): Doctor
    removeDoctor(_id: ID!): Doctor

    # Patient
    addPatient(fullname: String!, gender: String, dob: String, career: String, address: String, phone: String!, nationality: String, email: String, refBy: String, medicalHistory: [String]): Patient
    updatePatient(_id: ID!, fullname: String!, gender: String, dob: String, career: String, address: String, phone: String!, nationality: String, email: String, refBy: String, medicalHistory: [String]): Patient
    removePatient(_id: ID!): Patient

    # Record
    addRecord(patientId: String!, recordNumber: String!, cost: String!, teeth: String!, paid: String, createdDate: Int!, treatment: String!, doctorId: String!): Record
    updateRecord(_id: ID!, patientId: String!, recordNumber: String!, cost: String! no: Int!, teeth: String!, paid: String, createdDate: Int!, treatment: String!, doctorId: String!): Record
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

    #TreatmentRegimen
    addTreatmentRegimen(diseaseId: String!, content: String!): TreatmentRegimen
    updateTreatmentRegimen(_id: ID!, diseaseId: String!, content: String!): TreatmentRegimen
    removeTreatmentRegimen(_id: ID!): TreatmentRegimen

    #TreatmentStep
    addTreatmentStep(treatmentRegimenId: String!, content: String!): TreatmentRegimen
    updateTreatmentStep(_id: ID!, treatmentRegimenId: String!, content: String!): TreatmentRegimen
    removeTreatmentStep(_id: ID!): TreatmentRegimen
  }
`

// const batchDoctorLoader = () => {
//   return Doctor.find({ isEnabled: true })
// }

// const doctorLoader = new DataLoader(batchDoctorLoader)

const resolvers = {
  Query: {
    disease: (root, args, context, info) => Disease.findById(args._id),
    getDiseases: (root, args, context, info) => Disease.find({ isEnabled: true }),
    doctor: (root, args, context, info) => Doctor.findById(args._id),
    getDoctors: (root, args, context, info) => Doctor.find({ isEnabled: true }),
    patient: (root, args, context, info) => Patient.findById(args._id),
    getPatients: (root, args, context, info) => Patient.find({ isEnabled: true }),
    record: (root, args, context, info) => Record.findById(args._id),
    getRecords: (root, args, context, info) => Record.find({ isEnabled: true }),
    room: (root, args, context, info) => Room.findById(args._id),
    getRooms: (root, args, context, info) => Room.find({ isEnabled: true }),
    schedule: (root, args, context, info) => Schedule.findById(args._id),
    getSchedules: (root, args, context, info) => Schedule.find({ isEnabled: true }),
    step: (root, args, context, info) => Step.findById(args._id),
    getSteps: (root, args, context, info) => Step.find({ isEnabled: true }),
    treatmentRegimen: (root, args, context, info) => TreatmentRegimen.findById(args._id),
    getTreatmentRegimens: (root, args, context, info) => TreatmentRegimen.find({ isEnabled: true }),
    treatmentStep: (root, args, context, info) => TreatmentStep.findById(args._id),
    getTreatmentSteps: (root, args, context, info) => TreatmentStep.find({ isEnabled: true }),

    // FIXME: Login
    signIn: (root, args) => {
      async function findUser (username, password) {
        // let encryptedPassword = SHA256(password).toString()
        const result = await Doctor.findOne({ username, password })
        if (!result) throw new ApolloError(`Wrong username or password`, 400)
        const token = jwt.sign({
          sub: result
        }, 'digihcs')

        result.token = token
        return result
      }
      return findUser(args.username, args.password)
    }
  },

  Disease: {
    treatmentRegimens (disease) {
      return TreatmentRegimen.find({ diseaseId: disease._id, isEnabled: true })
    }
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
    doctor (record) {
      return Doctor.findById(record.doctorId)
    },
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

  TreatmentRegimen: {
    disease (treatmentRegimen) {
      return Disease.findById(treatmentRegimen.diseaseId)
    },
    treatmentSteps (treatmentRegimen) {
      return TreatmentStep.find({ treatmentRegimenId: treatmentRegimen._id, isEnabled: true })
    }
  },

  TreatmentStep: {
    treatmentRegimen (treatmentStep) {
      return TreatmentRegimen.findById(treatmentStep.treatmentRegimenId)
    }
  },

  Mutation: {
    // FIXME: RESET DATA
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

    // FIXME: CHANGE PASSWORD
    changePassword: (root, args) => {
      return Doctor.findOneAndUpdate({ _id: args._id }, args)
    },

    // FIXME: DISEASE
    addDisease: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newDisease = new Disease(args)
      return newDisease.save()
    },
    updateDisease: (root, args) => Disease.findOneAndUpdate({ _id: args._id }, args),
    removeDisease: (root, args) => Disease.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: DOCTOR
    addDoctor: (root, args) => {
      async function validateDoctor () {
        // validate
        Object.keys(args).forEach(function (key) {
          if (key === `username` || key === `password` || key === `fullname` || key === `specialize` || key === `phone`) {
            if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
          }
        })

        const doctorCount = await Doctor.countDocuments({ username: args.username })
        if (doctorCount !== 0) throw new ApolloError('Username has already used', 400)

        // args.password = SHA256(args.password).toString()
        args._id = mongoose.Types.ObjectId()
        args.isEnabled = true
        let newDoctor = new Doctor(args)
        return newDoctor.save()
      }
      return validateDoctor()
    },
    updateDoctor: (root, args) => {
      // validate
      Object.keys(args).forEach(function (key) {
        if (key === `fullname` || key === `specialize` || key === `phone`) {
          if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      return Doctor.findOneAndUpdate({ _id: args._id }, args)
    },
    removeDoctor: (root, args) => Doctor.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: PATIENT
    addPatient: (root, args) => {
      // validate
      Object.keys(args).forEach(function (key) {
        if (key === `fullname` || key === `phone`) {
          if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newPatient = new Patient(args)
      return newPatient.save()
    },
    updatePatient: (root, args) => {
      // validate
      Object.keys(args).forEach(function (key) {
        if (key === `fullname` || key === `phone`) {
          if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      return Patient.findOneAndUpdate({ _id: args._id }, args)
    },
    removePatient: (root, args) => Patient.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: RECORD
    addRecord: (root, args) => {
      async function validateData () {
        // validate
        Object.keys(args).forEach(function (key) {
          if (key !== `paid`) {
            if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
          }
        })

        const patientCount = await Patient.countDocuments({ _id: args.patientId })
        if (patientCount === 0) throw new ApolloError('Patient does not exist', 400)

        const doctorCount = await Doctor.countDocuments({ _id: args.doctorId })
        if (doctorCount === 0) throw new ApolloError('Doctor does not exist', 400)

        args._id = mongoose.Types.ObjectId()
        args.no = 0
        args.isEnabled = true
        let newRecord = new Record(args)
        return newRecord.save()
      }
      return validateData()
    },
    updateRecord: (root, args) => {
      // validate
      Object.keys(args).forEach(function (key) {
        if (key !== `paid`) {
          if (!checkTruthy(args[key])) throw new ApolloError(`${key} is null or contain whitespace`, 400)
        }
      })

      return Record.findOneAndUpdate({ _id: args._id }, args)
    },
    removeRecord: (root, args) => Record.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: ROOM
    addRoom: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newRoom = new Room(args)
      return newRoom.save()
    },
    updateRoom: (root, args) => Room.findOneAndUpdate({ _id: args._id }, args),
    removeRoom: (root, args) => Room.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: SCHEDULE
    addSchedule: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newSchedule = new Schedule(args)
      return newSchedule.save()
    },
    updateSchedule: (root, args) => Schedule.findOneAndUpdate({ _id: args._id }, args),
    removeSchedule: (root, args) => Schedule.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: STEP
    addStep: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.state = 0
      args.isEnabled = true
      let newStep = new Step(args)
      return newStep.save()
    },
    updateStep: (root, args) => Step.findOneAndUpdate({ _id: args._id }, args),
    removeStep: (root, args) => Step.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: TREATMENT REGIMEN
    addTreatmentRegimen: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newTreatmentRegimen = new TreatmentRegimen(args)
      return newTreatmentRegimen.save()
    },
    updateTreatmentRegimen: (root, args) => TreatmentRegimen.findOneAndUpdate({ _id: args._id }, args),
    removeTreatmentRegimen: (root, args) => TreatmentRegimen.findOneAndUpdate({ _id: args._id }, { isEnabled: false }),

    // FIXME: TREATMENT STEP
    addTreatmentStep: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      args.isEnabled = true
      let newTreatmentStep = new TreatmentStep(args)
      return newTreatmentStep.save()
    },
    updateTreatmentStep: (root, args) => TreatmentStep.findOneAndUpdate({ _id: args._id }, args),
    removeTreatmentStep: (root, args) => TreatmentStep.findOneAndUpdate({ _id: args._id }, { isEnabled: false })
  }
}

module.exports = { typeDefs, resolvers }
