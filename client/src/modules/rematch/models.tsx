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
    genderRadio: 1,
    patientData: [
      {
        fullname: 'Nguyen Van A',
        gender: 'male',
        dob: '12/12/2012',
        career: 'abc',
        address: '123 def',
        phone: '0123456789',
        nationality: 'Viet Nam',
        email: 'nva@gmai.com',
        refby: 'Bill Gates',
      }
    ]
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
        genderRadio: payload
      }
    }
  }
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
  }
}
