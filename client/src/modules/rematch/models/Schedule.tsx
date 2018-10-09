import { Client } from '../../apollo/apollo'
import * as GQL from '../../apollo/gql'

export const Schedule = {
  state: {
    visible: false,
    listSchedule: []
  },
  reducers: {
    setState(state: any, key: any, value: any) {
      return {
        ...state,
        [key]: value
      }
    },
    onCloseModal(state: any) {
      return {
        ...state,
        visible: false
      }
    },
    onOpenModal(state: any, payload: any) {
      return {
        ...state,
        visible: true
      }
    }
  },
  effects: (dispatch: any) => ({
    async InitData (payload: any, rootState: any) {
      let { data: { getSchedules: res } }: any = await Client().query({
        query: GQL.GQL_getSchedules
      })
      console.log(res)
    }
  })
}