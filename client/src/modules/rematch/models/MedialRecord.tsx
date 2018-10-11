import { Client } from '../../apollo/apollo'
import * as GQL from '../../apollo/gql'

const moment = require('moment')

export const MedialRecord = {
  state: {
    visible: false,
    visibletooth: false,
    mahoso: '',
    fullname: '',
    date: '',
    cost: '0',
    paid: '0',
    treatment: [],
    docter: '',
    listdatafullname: [],
    listtooth: [],
    notecount: -1,
    notetext: '',
    listdatarecord: [],
    visiblechitiet: false,
    datachitiet: {}
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
      } else {
        log.pop()
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
        query: GQL.GQL_getPatient
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
        createdDate: rootState.MedialRecord.date.unix(),
        treatment: '{}',
        doctorId: localStorage.getItem('_ID') || '5bbeb70c341bd21a807078a3'
      }
      let res: any = await Client().mutate({
        variables: data,
        mutation: GQL.GQL_addRecord
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
        query: GQL.GQL_getRecords
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
