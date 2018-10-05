import * as React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time'
  },
  {
    title: 'Docter',
    key: 'docter',
    dataIndex: 'docter'
  },
  {
    title: 'Room',
    key: 'room',
    dataIndex: 'room'
  },
  {
    title: 'Patient',
    key: 'patient',
    dataIndex: 'patient'
  },
  {
    title: 'Content',
    key: 'content',
    dataIndex: 'content'
  }
]

export const TableDashboard = ({ props }: { props: any }) => {
  return <Table columns={columns} />
}
