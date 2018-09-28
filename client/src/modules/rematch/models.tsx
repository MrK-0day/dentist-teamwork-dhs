import { Client } from '../apollo/apollo'
import { GQL_getPatient } from '../apollo/gql'

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
    openModal (state: any, target: String) {
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
    cost: '0',
    paid: '0',
    docter: '',
    listdatafullname: ['Phát', 'Tuấn', 'Lộc'],
    listtooth: []
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
