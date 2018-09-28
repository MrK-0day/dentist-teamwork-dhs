import { Client } from '../apollo/apollo'
import { GQL_getPatient, GQL_addPatient } from '../apollo/gql'

const moment = require('moment')

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
    genderRadio: "male",
    patientData: [],
    fullname: '',
    gender: 'male',
    dob: 0,
    career: '',
    address: '',
    phone: '',
    nationality: '',
    email: '',
    refBy: ''
  },
  reducers: {
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
        ...state,fullname: '',
        gender: '',
        dob: 0,
        career: '',
        address: '',
        phone: '',
        nationality: '',
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
        return {
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
      let newPatient = {
        ...res.data.addPatient
      }
      newPatient['dob'] = moment(res.data.addPatient.dob*1000).format(`DD-MM-YYYY`)
      newPatientData.push(newPatient)
      console.log(newPatientData)
    }

  })
}

export const MedialRecord = {
  state: {
    visible: false
  },
  reducers: {
    onOpenModalAdd (state: any) {
      return {
        ...state,
        visible: true
      }
    },
    onCloseModalAdd (state: any) {
      return {
        ...state,
        visible: false
      }
    }
  },
  effects: (dispatch: any) => ({
    async InitData (payload: any, rootState: any) {
      let res: any = await Client().query({
        query: GQL_getPatient
      })
      let listname: string[] = res.data.getPatients.map((value: any) => value.fullname)
      dispatch.MedialRecord.setState('listdatafullname', listname)
    }
  })
}
