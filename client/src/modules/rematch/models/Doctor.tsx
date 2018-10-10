import { Client } from '../../apollo/apollo'
import * as GQL from '../../apollo/gql'
import { DateFormat } from '../../../components/misc/const'

const moment = require('moment')
const momentDateString = moment().format(DateFormat).split('-')
const momentTimeStamp = moment().set({
  'date': +momentDateString[0],
  'month': +momentDateString[1] - 1,
  'year': +momentDateString[2],
  'hour': 0,
  'minute': 0,
  'second': 0
}).unix()

export const Doctor = {
  state: {
    targetModal: 'none',
    target: '',
    doctorData: [],
    fullname: '',
    gender: 'male',
    dob: momentTimeStamp,
    specialize: '',
    address: '',
    phone: '',
    nationality: 'Viet Nam',
    email: '',
    refBy: '',
    password: '',
    username: ''
  },
  reducers: {
    initEditModal (state: any, doctor: any) {
      return {
        ...state,
        target: doctor._id,
        fullname: doctor.fullname,
        gender: doctor.gender,
        dob: doctor.dob,
        career: doctor.specialize,
        address: doctor.address,
        phone: doctor.phone,
        nationality: doctor.nationality,
        email: doctor.email,
        refBy: doctor.refBy,
        username: doctor.username,
        password: doctor.password
      }
    },
    openModal (state: any, target: string) {
      return {
        ...state,
        targetModal: target
      }
    },
    closeModal (state: any) {
      return {
        ...state,
        targetModal: 'none'
      }
    },
    onGenderRadioChange (state: any, payload: any) {
      return {
        ...state,
        gender: payload
      }
    },
    setMyState (state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    },
    resetData (state: any) {
      return{
        ...state,
        fullname: '',
        gender: '',
        dob: 0,
        career: '',
        address: '',
        phone: '',
        nationality: 'Viet Nam',
        email: '',
        refBy: ''
      }
    }
  },
  effects: (dispatch: any) => ({
    async asyncInitData (payload: any,rootState: any) {
      let res: any = await Client()
        .query(
          {
            query: GQL.GQL_getDoctor
          }
        )
      // console.log(res.data)
      let newDoctorList = res.data.getDoctors.map((doctor: any)=>{
        // console.log(doctor.isEnabled)
        if(doctor.isEnabled===true) {
          return {
            id: doctor._id,
            fullname: doctor.fullname,
            gender: doctor.gender,
            dob: moment(doctor.dob*1000).format(DateFormat),
            specialize: doctor.specialize,
            address: doctor.address,
            phone: doctor.phone,
            nationality: doctor.nationality,
            email: doctor.email,
            refBy: doctor.refBy,
            username: doctor.username
          }
        }
      })
      // console.log(newDoctorList)
      dispatch.Doctor.setMyState('doctorData',newDoctorList)
    },
    async asyncAddDoctor (payload: any, rootState: any){
      // console.log(rootState.Doctor)
      // let newDoctorData = [...rootState.Doctor.doctorData]
      let res : any = await Client().mutate({
        variables: {
          'fullname': rootState.Doctor.fullname,
          'gender': rootState.Doctor.gender,
          'dob': rootState.Doctor.dob.toString(),
          'career': rootState.Doctor.specialize,
          'address': rootState.Doctor.address,
          'phone': rootState.Doctor.phone,
          'nationality': rootState.Doctor.nationality,
          'email': rootState.Doctor.email,
          'refBy': rootState.Doctor.refBy,
          'username': rootState.Doctor.username,
          'password': rootState.Doctor.password
        },
        mutation: GQL.GQL_addDoctor
      })
      dispatch.Doctor.resetData()
    },
    async asyncRemoveDoctor (payload: any, rootState: any) {
      let res: any = await Client()
      .mutate({
          variables: {
            '_id': rootState.Doctor.target
          },
          mutation: GQL.GQL_removeDoctor
        }
      )
      // console.log(res)
      dispatch.Doctor.resetData()
    },
    async asyncUpdateDoctor (payload: any, rootState: any) {
      let res: any = await Client()
      .mutate({
        variables: {},
        mutation: GQL.GQL_removeDoctor
      })
      // console.log(res)
      dispatch.Doctor.resetData()
    }
  })
}
