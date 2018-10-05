import { Client } from '../apollo/apollo'
import { DateFormat } from '../../components/misc/const'
import { GQL_getPatient, GQL_getPatientById, GQL_addPatient  ,GQL_removePatient, GQL_updatePatient, GQL_getRecords, GQL_addRecord, GQL_getSchedules, GQL_getDoctor } from '../apollo/gql'

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


export const Login = {
  state: {
    username: '',
    password: ''
  },
  reducers: {
    setState(state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    }
  },
  effects: (dispatch: any) => ({
    async onLogin (payload: any, rootState: any) {
      localStorage.setItem('TOKEN', 'cc')
      payload.push('/')
    }
  })
}

export const Home = {
  state: {
    isCollapsed: false,
    isSelectMenuItem: '',
    isModalThem: false
  },
  reducers: {
    setState (state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    },
    onCollapsed (state: any) {
      return {
        ...state,
        isCollapsed: !state.isCollapsed
      }
    },
    onModalThem (state: any, payload: any) {
      if (payload) {
        return {
          ...state,
          isModalThem: true
        }
      } else {
        return {
          ...state,
          isModalThem: false
        }
      }
    }
  }
}

export const Dashboard = {
  state: {},
  reducers: {}
}

export const Patient = {
  state: {
    targetModal: 'none',
    target: '',
    genderRadio: "male",
    patientData: [],
    fullname: '',
    gender: 'male',
    dob: momentTimeStamp,
    career: '',
    address: '',
    phone: '',
    nationality: 'Viet Nam',
    email: '',
    refBy: ''
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
        refBy: patient.refBy
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
        genderRadio: payload,
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
  effects: (dispatch: any) =>({
    async asyncInitData (payload: any,rootState: any) {
      let res: any =await Client()
        .query(
          {
            query: GQL_getPatient
          }
        )
      console.log(res.data.getPatients)
      let newPatientList = res.data.getPatients.map((patient: any)=>{
        console.log(patient.isEnabled)
        if(patient.isEnabled===true) {
          return {
            id: patient._id,
            fullname: patient.fullname,
            gender: patient.gender,
            dob: moment(patient.dob*1000).format(`DD-MM-YYYY`),
            career: patient.career,
            address: patient.address,
            phone: patient.phone,
            nationality: patient.nationality,
            email: patient.email,
            refBy: patient.refBy
          }
        }
      })
      dispatch.Patient.setMyState('patientData',newPatientList)
    },
    async asyncAddPatient (payload: any, rootState: any){
      console.log(rootState.Patient)
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
          'refBy': rootState.Patient.refBy
        },
        mutation: GQL_addPatient
      })
      // let newPatient = {
      //   ...res.data.addPatient
      // }
      // newPatient['dob'] = moment(res.data.addPatient.dob*1000).format(`DD-MM-YYYY`)
      // newPatientData.push(newPatient)
      // console.log(newPatientData)
      // dispatch.Patient.setMyState('patientData',newPatientData)
      dispatch.Patient.resetData()
    },
    async asyncDeletePatient (payload: any, rootState: any) {
      let res: any = await Client()
      .mutate({
          variables: {
            '_id': rootState.Patient.target
          },
          mutation: GQL_removePatient
        }
      )
      console.log(res)
      dispatch.Patient.resetData()
    },
    async asyncInitUpdatePatient (id: any, rootState: any) {
      let res: any = await Client()
      .query(
        {
          variables: {
            _id: id
          },
          query: GQL_getPatientById
        }
      )
      console.log(res.data)
      dispatch.Patient.initEditModal(res.data.patient)
      dispatch.Patient.openModal('edit')
      // let patients = [...res.data.getPatients]
      // for( var i = 0; i< patients.length ; i++) {
      //   if(patients[i]._id == id) {
      //     console.log(patients[i])
      //   }
      // }
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
          'refBy': rootState.Patient.refBy
        },
        mutation: GQL_updatePatient
      })
      console.log(res)
      dispatch.Patient.resetData()
    }
  })
}

export const Doctor = {
  state: {
    targetModal: 'none',
    target: '',
    genderRadio: "male",
    doctorData: [],
    fullname: '',
    gender: 'male',
    dob: momentTimeStamp,
    specialize: '',
    address: '',
    phone: '',
    nationality: 'Viet Nam',
    email: '',
    refBy: ''
  },
  reducers: {
    setMyState (state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    }
  },
  effects: (dispatch: any) => ({
    async asyncInitData (payload: any,rootState: any) {
      let res: any =await Client()
        .query(
          {
            query: GQL_getDoctor
          }
        )
      console.log(res.data)
      let newDoctorList = res.data.getDoctors.map((doctor: any)=>{
        console.log(doctor.isEnabled)
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
      console.log(newDoctorList)
      dispatch.Doctor.setMyState('doctorData',newDoctorList)
    }
  })
}

export const MedialRecord = {
  state: {
    visible: false,
    visibletooth: false,
    mahoso: '',
    fullname: '',
    date: '',
    cost: '0',
    paid: '0',
    docter: '',
    listdatafullname: [],
    listtooth: [],
    notecount: -1,
    notetext: '',
    listdatarecord: []
  },
  reducers: {
    setState (state: any, key: any, value: any) {
      if (key === 'cost' || key === 'paid') {
        let cost = value.replace(/[\D\s\._\-]+/g, '')
        cost = cost ? parseInt(cost, 10) : 0
        return {
          ...state,
          [key]: cost.toLocaleString('vi-VN')
        }
      }
      return {
        ...state,
        [key]: value
      }
    },
    onOpenModalAdd (state: any) {
      return {
        ...state,
        visible: true,
        date: moment()
      }
    },
    onCloseModalAdd (state: any, payload: any) {
      if (payload === 'CANCEL') {
        return {
          ...state,
          visible: false
        }
      } else {
        return {
          ...state,
          visible: false,
          cost: '0',
          paid: '0',
          fullname: '',
          listtooth: [],
          mahoso: ''
        }
      }
    },
    onOpenDrawNote (state: any, payload: any) {
      return {
        ...state,
        visibletooth: true,
        notecount: payload
      }
    },
    onCloseDrawNode (state: any, payload: any) {
      let log = [...state.listtooth]
      if (payload === 'OK') {
        for (let i in log) {
          if (log[i].tooth === state.notecount) {
            log[i].note = state.notetext
            break
          }
        }
      }
      return {
        ...state,
        visibletooth: false,
        notecount: -1,
        notetext: '',
        listtooth: log
      }
    },
    onremoveRecord (state: any, payload: any) {
      let log = [...state.listdatarecord].filter((value: any) => value.key !== payload)
      return {
        ...state,
        listdatarecord: log
      }
    }
  },
  effects: (dispatch: any) => ({
    async InitData (payload: any, rootState: any) {
      let res: any = await Client().query({
        query: GQL_getPatient
      })
      let listname: string[] = res.data.getPatients.map((value: any) => { return { key: value._id, data: `${value.fullname} - ${value.phone}` } })
      // let listname: string[] = res.data.getPatients.map((value: any) => `${value.fullname} - ${value.phone}` )
      dispatch.MedialRecord.setState('listdatafullname', listname)
    },
    async addMedialRecords (payload: any, rootState: any) {
      let id = null
      for (let v of rootState.MedialRecord.listdatafullname) {
        if (v.data === rootState.MedialRecord.fullname) {
          id = v.key
          break
        }
      }
      let data = {
        patientId: rootState.MedialRecord.fullname,
        recordNumber: rootState.MedialRecord.mahoso,
        cost: rootState.MedialRecord.cost,
        paid: rootState.MedialRecord.paid,
        teeth: JSON.stringify(rootState.MedialRecord.listtooth),
        createdDate: 123456,
        treatment: '{}',
        doctorId: '5badf119883e91274201b543'
      }
      let res: any = await Client().mutate({
        variables: data,
        mutation: GQL_addRecord
      })
      let log: any = res.data.addRecord
      let data1: any[] = [...rootState.MedialRecord.listdatarecord]
      data1.push({
        key: log._id,
        fullname: log.patient.fullname,
        userid: log.patient._id,
        no: log.no,
        recordNumber: log.recordNumber,
        step: '0',
        cost: log.cost,
        paid: log.paid,
        teeth: log.teeth,
        createdDate: log.createdDate
      })
      dispatch.MedialRecord.setState('listdatarecord', data1)
      return true
    },
    async InitMedialRecord (payload: any, rootState: any) {
      let res: any = await Client().query({
        query: GQL_getRecords
      })
      let log: any[] = res.data.getRecords
      let data: any[] = log.map((value: any) => {
        return {
          key: value._id,
          fullname: value.patient.fullname,
          userid: value.patient._id,
          no: value.no,
          recordNumber: value.recordNumber,
          step: '0',
          cost: value.cost,
          paid: value.paid,
          teeth: value.teeth,
          createdDate: value.createdDate
        }
      })
      dispatch.MedialRecord.setState('listdatarecord', data)
    }
  })
}

export const Schedule = {
  state: {
    listSchedule: []
  },
  reducers: {
    setState(state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    }
  },
  effects: (dispatch: any) => ({
    async InitData (payload: any, rootState: any) {
      let res: any = await Client().query({
        query: GQL_getSchedules
      })
      console.log(res.data.getSchedules)
    }
  })
}
