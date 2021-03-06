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

export const Patient = {
  state: {
    targetModal: 'none',
    target: '',
    gender:'male',
    patientData: [],
    fullname: '',
    dob: momentTimeStamp,
    career: '',
    address: '',
    phone: '',
    nationality: 'Viet Nam',
    email: '',
    refBy: '',
    medicalHistory: [],
    editKeys : []
  },
  reducers: {
    initEditModal (state: any, patient: any) {
      return {
        ...state,
        target: patient._id,
        fullname: patient.fullname,
        gender: patient.gender,
        dob: patient.dob,
        career: patient.career,
        address: patient.address,
        phone: patient.phone,
        nationality: patient.nationality,
        email: patient.email,
        refBy: patient.refBy,
        medicalHistory: [...patient.medicalHistory],
        editKeys: patient.keys
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
        dob: 0,
        career: '',
        address: '',
        phone: '',
        nationality: 'Viet Nam',
        email: '',
        refBy: '',
        target: '',
        gender: 'male',
        editKeys: []
      }
    }
  },
  effects: (dispatch: any) =>({
    async asyncInitData (payload: any,rootState: any) {
      let res: any =await Client()
        .query(
          {
            query: GQL.GQL_getPatient
          }
        )
      let newPatientList = res.data.getPatients.map((patient: any)=>{
        if(patient.isEnabled===true) {
          return {
            id: patient._id,
            fullname: patient.fullname,
            gender: patient.gender==='male'?'Nam':patient.gender==='female'?'Nữ': 'Khác',
            dob: moment(patient.dob*1000).format(`DD-MM-YYYY`),
            career: patient.career,
            address: patient.address,
            phone: patient.phone,
            nationality: patient.nationality,
            email: patient.email,
            refBy: patient.refBy,
            medicalHistory: [...patient.medicalHistory]
          }
        }
      })
      console.log(newPatientList)
      dispatch.Patient.setMyState('patientData',newPatientList)
    },
    async asyncAddPatient (payload: any, rootState: any){
      let newPatientData = [...rootState.Patient.patientData]
      let res : any = await Client().mutate({
        variables: {
          'fullname': rootState.Patient.fullname,
          'gender': rootState.Patient.gender,
          'dob': rootState.Patient.dob.toString(),
          'career': rootState.Patient.career,
          'address': rootState.Patient.address,
          'phone': rootState.Patient.phone,
          'nationality': rootState.Patient.nationality,
          'email': rootState.Patient.email,
          'refBy': rootState.Patient.refBy,
          'medicalHistory': rootState.Patient.medicalHistory
        },
        mutation: GQL.GQL_addPatient
      })
      dispatch.Patient.resetData()
    },
    async asyncDeletePatient (payload: any, rootState: any) {
      let res: any = await Client()
      .mutate({
          variables: {
            '_id': rootState.Patient.target
          },
          mutation: GQL.GQL_removePatient
        }
      )
      dispatch.Patient.resetData()
    },
    async asyncInitUpdatePatient (id: any, rootState: any) {
      let res: any = await Client()
      .query(
        {
          variables: {
            _id: id
          },
          query: GQL.GQL_getPatientById
        }
      )
      let newKeys = res.data.patient.medicalHistory.map((v: any,i: any)=> {return i})
      let patient = {
        ...res.data.patient,
        keys: newKeys
      }
      dispatch.Patient.initEditModal(patient)
      dispatch.Patient.openModal('edit')
    },
    async asyncUpdatePatient (payload: any, rootState: any) {
      let res: any = await Client()
      .mutate({
        variables: {
          '_id': rootState.Patient.target,
          'fullname': rootState.Patient.fullname,
          'gender': rootState.Patient.gender,
          'dob': rootState.Patient.dob.toString(),
          'career': rootState.Patient.career,
          'address': rootState.Patient.address,
          'phone': rootState.Patient.phone,
          'nationality': rootState.Patient.nationality,
          'email': rootState.Patient.email,
          'refBy': rootState.Patient.refBy,
          'medicalHistory': rootState.Patient.medicalHistory
        },
        mutation: GQL.GQL_updatePatient
      })
      // console.log(res)
      dispatch.Patient.resetData()
    },
  })
}
