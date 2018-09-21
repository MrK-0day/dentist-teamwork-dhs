const { gql, PubSub, ApolloError } = require('apollo-server-express')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const _ = require('lodash')

// models
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const Record = require('./models/Record')
const Room = require('./models/Room')
const Schedule = require('./models/Schedule')
const Step = require('./models/Step')

const SCHEDULE_UPDATE = 'SCHEDULE_UPDATE'

const typeDefs = gql`
  type Doctor {
    _id:            String
    fullname:       String
    specialize:     String
    phone:          String
    isEnabled:      Boolean
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
    refby:          String
    medicalrecord:  [Int]
    isEnabled:      Boolean
  }
  type Teeth {
    code:           String
    state:          Int
    note:           String
  }
  type Record {
    _id:            String
    recordnumber:   Int
    no:             Int
    cost:           Int
    paid:           Int
    datecreated:    String
    teeth:          [Teeth]
    treatment:      String
    isEnabled:      Boolean
  }
  type Room {
    _id:            String
    code:           String
    name:           String
    isEnabled:      Boolean
  }
  type Schedule {
    _id:            String
    timestamp:      Int
    doctorid:       String
    stepid:         String
    patientid:      String
    content:        String
    roomId:         String
    isEnabled:      Boolean
  }
  type Step {
    _id:            String
    code:           String
    name:           String
    content:        String
    state:          Int
    isEnabled:      Boolean
  }

  type Query {
    doctor(_id: ID!):   Doctor
    getDoctors:        [Doctor]
    patient(_id: ID!):  Patient
    getPatients:       [Patient]
    record(_id: ID!):   Record
    getRecords:        [Record]
    room(_id: ID!):     Room
    getRooms:          [Room]
    schedule(_id: ID!): Schedule
    getSchedules:      [Schedule]
    step(_id: ID!):     Step
    getSteps:          [Step]
  }

  type Mutation {
    # reset Data
    resetAll(confirm: String!): Boolean
    # Patient
    addPatient(fullname: String!, gender: String, dob: String, career: String, address: String, phone: String!, nationality: String, email: String, refby: String, medicalrecord: [String], isEnabled: Boolean!): Patient
  }
`
//   type Mutation {
//     # Seat
//     addSeat(code: String!, x: Int!, y: Int!, state: Int, isEnabled: Boolean!, roomId: String!): Seat
//     updateSeat(_id: ID!, code: String, x: Int, y: Int, state: Int, isEnabled: Boolean, roomId: String): Seat
//     removeSeat(_id: ID!): Seat
//     # Room
//     addRoom(code: String!, name: String, width: Int!, length: Int!, isEnabled: Boolean!): Room
//     updateRoom(_id: ID!, code: String, name: String, width: Int, length: Int, isEnabled: Boolean): Room
//     removeRoom(_id: ID!): Room
//     # User
//     addUser(username: String!, password: String, imageUrl: String, firstname: String, lastname: String, isEnabled: Boolean!): User
//     updateUser(_id: ID!, username: String!, password: String, imageUrl: String, firstname: String, lastname: String, isEnabled: Boolean!): User
//     removeUser(_id: ID!): User
//     # Schedule
//     addSchedule(seatId: String!, userId: String!, timestamp: Int!): Schedule
//     updateSchedule(_id: ID!, roomId: String, seatId: String, userId: String, timestamp: Int): Schedule
//     deleteSchedule(_id: ID!, seatId: String!): Schedule
//     # Auth
//     login(username: String!, password: String!): LoginResponse!
//     # reset Data
//     resetAll(confirm: String!): Boolean
//   }

//   type Subscription {
//     scheduleUpdate: Schedule
//   }
// `

const resolvers = {
  Query: {
    patient: (root, args, context, info) => Patient.findById(args._id),
    getPatients: (root, args, context, info) => Patient.find({isEnabled: true})
    // room: (root, args, context, info) => Room.findById(args._id),
    // user: (root, args, context, info) => User.findById(args._id),
    // schedule: (root, args, context, info) => Schedule.findById(args._id),
    // getUsers: (root, args, context, info) => User.find({isEnabled: true}),
    // getRooms: (root, args, context, info) => Room.find({isEnabled: true}),
    // getSchedules: (root, args, context, info) => Schedule.find()
  },
  Mutation: {
    // RESET DATA
    resetAll: (root, args) => {
      if (args.confirm === 'yes') {
        Doctor.remove({}).exec()
        Patient.remove({}).exec()
        Record.remove({}).exec()
        Room.remove({}).exec()
        Schedule.remove({}).exec()
        Step.remove({}).exec()
        return true
      }
      return false
    },

    // PATIENT
    addPatient: (root, args) => {
      args._id = mongoose.Types.ObjectId()
      let newPatient = new Patient(args)
      return newPatient.save()
    },
  }
  // Room: {
  //   seats (room) {
  //     return Seat.find({roomId: room._id, isEnabled: true})
  //   }
  // },
  // Seat: {
  //   room (seat) {
  //     return Room.findById(seat.roomId)
  //   }
  // },
  // Schedule: {
  //   user (schedule) {
  //     return User.findById(schedule.userId)
  //   },
  //   room (schedule) {
  //     return Room.findById(schedule.roomId)
  //   },
  //   seat (schedule) {
  //     return Seat.findById(schedule.seatId)
  //   }
  // },
  // Mutation: {
  //   // RESET DATA
  //   resetAll: (root, args) => {
  //     if (args.confirm === 'yes') {
  //       Seat.remove({}).exec()
  //       Room.remove({}).exec()
  //       User.remove({}).exec()
  //       Schedule.remove({}).exec()
  //       return true
  //     }
  //     return false
  //   },
  //   // AUTH
  //   login: async (root, args, {session, req}) => {
  //     console.log(args)
  //     const user = await User.findOne({ 'username': args.username })
  //     console.log(user)
  //     if (!user) {
  //       return {errors: 'Wrong username or password'}
  //     }
  //     // const valid = await bcrypt.compare(password, user.password)
  //     console.log(args.password)
  //     if (user.password !== args.password) {
  //       return {errors: 'Wrong username or password'}
  //     }
  //     var token = jwt.sign({
  //       sub: user
  //     }, 'digihcs')
  //     // if (req.sessionID) {
  //     //   await redis.lpush(`userSids:${user._id}`, req.sessionID)
  //     // }
  //     return { token: token }
  //   },
  //   // SEAT
  //   addSeat: (root, args) => {
  //     args._id = mongoose.Types.ObjectId()
  //     let newSeat = new Seat(args)
  //     return newSeat.save()
  //   },
  //   updateSeat: (root, args) => Seat.findOneAndUpdate({_id: args._id}, args),
  //   removeSeat: (root, args) => Seat.findOneAndUpdate(args, {$set: {isEnabled: false}}),
  //   // ROOM
  //   addRoom: (root, args) => {
  //     console.log(args)
  //     args._id = mongoose.Types.ObjectId()
  //     let newRoom = new Room(args)
  //     return newRoom.save()
  //   },
  //   updateRoom: (root, args) => Room.findOneAndUpdate({_id: args._id}, args),
  //   removeRoom: (root, args) => Room.findOneAndUpdate(args, {$set: {isEnabled: false}}),
  //   // USER
  //   addUser: (root, args) => {
  //     console.log(args)
  //     args._id = mongoose.Types.ObjectId()
  //     let newUser = new User(args)
  //     return newUser.save()
  //   },
  //   updateUser: (root, args) => User.findOneAndUpdate({_id: args._id}, args),
  //   removeUser: (root, args) => User.findOneAndUpdate(args, {$set: {isEnabled: false}}),
  //   // SCHEDULE
  //   addSchedule: (root, args) => {
  //     async function getRoom () {
  //       const count = await Schedule.countDocuments(args).exec()
  //       if (count) throw new ApolloError('Duplicate schedule', '400', args)
  //       const seat = await Seat.findById(args.seatId).exec()
  //       args._id = mongoose.Types.ObjectId()
  //       args.roomId = seat.roomId
  //       let newSchedule = new Schedule(args)
  //       pubsub.publish(SCHEDULE_UPDATE, {scheduleUpdate: args})
  //       return newSchedule.save()
  //     }
  //     return getRoom()
  //   },
  //   updateSchedule: (root, args) => {
  //     pubsub.publish(SCHEDULE_UPDATE, {scheduleUpdate: args})
  //     return Schedule.findOneAndUpdate({_id: args._id}, args)
  //   },
  //   deleteSchedule: (root, args) => {
  //     pubsub.publish(SCHEDULE_UPDATE, {scheduleUpdate: args})
  //     return Schedule.deleteOne(args)
  //   }
  // },
  // Subscription: {
  //   scheduleUpdate: {
  //     subscribe: () => pubsub.asyncIterator([SCHEDULE_UPDATE])
  //   }
  // }
}

module.exports = {typeDefs, resolvers}
