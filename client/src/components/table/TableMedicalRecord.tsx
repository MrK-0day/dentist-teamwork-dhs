import * as React from 'react'
import { Table, Button } from 'antd'

export const TableMedicalRecord = ({ props }: { props: any }) => {
  function Xoa (e: any) {
    // console.log(e.target.id)
    props.RemoveMedialRecord(e.target.id)
  }
  function Sua (e: any) {
    // console.log(e.target.id)
    props.editMedialRecord(e.target.id)
  }
  const columns = [
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'action',
      render: (value: any) => {
        return (
          <div>
            <Button onClick={Xoa} id={value}>Xóa</Button>
            <Button onClick={Sua} id={value} type='primary'>Sửa</Button>
          </div>
        )
      },
      width: '200px'
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
  return <Table bordered={true} columns={columns} dataSource={props.listdatarecord} />
}
