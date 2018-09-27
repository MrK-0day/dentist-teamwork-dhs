import * as React from 'react'
import { Table, Button, Modal } from 'antd'


export const TablePatient = ({ props }: { props: any }) => {
  const columns = [
    {
      title:'Name',
      key:'fullname',
      dataIndex:'fullname',
      width: 300
    },
    {
      title:'Gender',
      key:'gender',
      dataIndex:'gender',
      width: 100
    },
    {
      title:'Birthdate',
      key:'dob',
      dataIndex:'dob'
    },
    {
      title:'Job',
      key:'career',
      dataIndex:'career'
    },
    {
      title:'Address',
      key:'address',
      dataIndex:'address'
    },
    {
      title:'Phone',
      key:'phone',
      dataIndex:'phone'
    },
    {
      title:'Nationality',
      key:'nationality',
      dataIndex:'nationality'
    },
    {
      title:'E-mail',
      key:'email',
      dataIndex:'email'
    },
    {
      title:'Referer',
      key:'refby',
      dataIndex:'refby'
    },
    {
      title:'Actions',
      key:'actions',
      width: 170,
      render: () => (
        <span><Button type='primary' onClick={()=>props.openModal('edit')}>Edit</Button><Button onClick={()=>props.openModal('delete')}>Delete</Button></span>
      )
    }
  ]
  return <Table bordered={true} columns={columns} dataSource={props.patientData} />
}
