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
