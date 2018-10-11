import { Client } from '../../apollo/apollo'
import { GQL_signin } from '../../apollo/gql'
const SHA256 = require('crypto-js/sha256')
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
      let passHash = SHA256(rootState.Login.password).toString()
      let { data: { signIn: res } }: any = await Client().query({
        variables: {
          username: rootState.Login.username,
          password: passHash
        },
        query: GQL_signin
      })
      // console.log(res)
      localStorage.setItem('TOKEN', res.token)
      localStorage.setItem('_ID', res._id)
      // localStorage.setItem('TOKEN', 'cc')
      payload.push('/')
    }
  })
}
