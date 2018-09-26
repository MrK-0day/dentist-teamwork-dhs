import * as React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action'
  },
  {
    title: 'Patient',
    key: 'patient',
    dataIndex: 'patient'
  },
  {
    title: 'Record',
    key: 'record',
    dataIndex: 'record'
  },
  {
    title: 'Code',
    key: 'code',
    dataIndex: 'code'
  },
  {
    title: 'Step',
    key: 'step',
    dataIndex: 'step'
  },
  {
    title: 'Cost',
    key: 'cost',
    dataIndex: 'cost'
  },
  {
    title: 'Paid',
    key: 'paid',
    dataIndex: 'paid'
  },
]

export const TableMedicalRecord = ({ props }: { props: any }) => {
  return <Table bordered={true} columns={columns} />
}
