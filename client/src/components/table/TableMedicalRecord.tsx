import * as React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Thao tác',
    key: 'action',
    dataIndex: 'action'
  },
  {
    title: 'Bệnh Nhân',
    key: 'patient',
    dataIndex: 'patient'
  },
  {
    title: 'Số Lần Khám',
    key: 'no',
    dataIndex: 'no'
  },
  {
    title: 'Mã Bệnh Án',
    key: 'recordnumber',
    dataIndex: 'recordnumber'
  },
  {
    title: 'Giai Đoạn',
    key: 'step',
    dataIndex: 'step'
  },
  {
    title: 'Tổng Tiền',
    key: 'cost',
    dataIndex: 'cost'
  },
  {
    title: 'Đã Thanh Toán',
    key: 'paid',
    dataIndex: 'paid'
  },
]

export const TableMedicalRecord = ({ props }: { props: any }) => {
  return <Table bordered={true} columns={columns} />
}
