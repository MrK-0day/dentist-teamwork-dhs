import { Client } from '../../apollo/apollo'
import * as GQL from '../../apollo/gql'

const moment = require('moment')

export const Schedule = {
  state: {
    visible: false,
    listSchedule: [],
    listbenhnhan: [],
    fullname: '',
    listbacsi: [],
    bacsi: '',
    ghichu: '',
    date: moment(),
    listphong: [],
    phong: ''
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
    },
    resetInitData(state: any, payload: any) {
      return {
        ...state,
        fullname: '',
        bacsi: '',
        ghichu: '',
        phong: '',
        date: moment()
      }
    }
  },
  effects: (dispatch: any) => ({
    async InitData (payload: any, rootState: any) {
      let { data: { getSchedules: res } }: any = await Client().query({
        query: GQL.GQL_getSchedules
      })
      // console.log(res)
    },
    async loadListbenhnhan (payload: any, rootState: any) {
      let { data: { getPatients: res } }: any = await Client().query({
        query: GQL.GQL_getPatient
      })
      dispatch.Schedule.setState('listbenhnhan', res.map((v: any) => {
        return {
          key: v._id,
          value: `${v.fullname} - ${v.phone}`
        }
      }))
    },
    async loatListbacsi (payload: any, rootState: any) {
      let { data: { getDoctors: res } }: any = await Client().query({
        query: GQL.GQL_getDoctor
      })
      dispatch.Schedule.setState('listbacsi', res.map((v: any) => {
        return {
          key: v._id,
          value: v.fullname
        }
      }))
    },
    async loadListphong (payload: any, rootState: any) {
      let { data: { getRooms: res } }: any = await Client().query({
        query: GQL.GQL_getRooms
      })
      dispatch.Schedule.setState('listphong', res.map((v: any) => {
        return {
          key: v._id,
          value: v.name,
          code: v.code
        }
      }))
    }
  })
}