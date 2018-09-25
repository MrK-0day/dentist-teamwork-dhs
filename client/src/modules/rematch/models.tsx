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
    addModal: false
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
