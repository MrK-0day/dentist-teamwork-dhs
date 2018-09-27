import { Client } from '../apollo/apollo'
import gql from 'graphql-tag'

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
    addModal: false,
    genderRadio: "male",
    patientData: [
      {
        fullname: 'Nguyen Van A',
        gender: 'male',
        dob: '12-12-2012',
        career: 'abc',
        address: '123 def',
        phone: '0123456789',
        nationality: 'Viet Nam',
        email: 'nva@gmai.com',
        refby: 'Bill Gates',
      }
    ],
    fullname: '',
    gender: '',
    dob: 0,
    career: '',
    address: '',
    phone: '',
    nationality: '',
    email: '',
    refby: ''
  },
  reducers: {
    openAddModal (state: any) {
      return {
        ...state,
        addModal: true
      }
    },
    closeAddModal (state: any) {
      return {
        ...state,
        addModal: false
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
    initData (state: any) {
      return{
        ...state,
        fullname: '',
        gender: '',
        dob: 0,
        career: '',
        address: '',
        phone: '',
        nationality: '',
        email: '',
        refby: ''
      }
    },
    addPatient (state: any){
      let newPatientData = [...state.patientData]
      let newPatient= {
        name: state.fullname,
        gender: state.gender,
        dob: state.dob,
        career: state.careeer,
        address: state.address,
        phone: state.phone,
        nationality: state.nationality,
        email: state.email,
        refby: state.refby
      }
      newPatientData.push(newPatient)
      return {
        ...state,
        patientData: newPatientData
      }
      console.log(state)
      return{
        ...state,
        fullname: '',
        gender: '',
        dob: 0,
        career: '',
        address: '',
        phone: '',
        nationality: '',
        email: '',
        refby: ''
      }
    }

  }
}

export const MedialRecord = {
  state: {
    visible: false,
    visibletooth: false,
    fullname: '',
    date: '',
    cost: 0,
    paid: 0,
    docter: '',
    listdatafullname: ['Phát', 'Tuấn', 'Lộc'],
    listtooth: []
  },
  reducers: {
    setState (state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    },
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
  }
}
