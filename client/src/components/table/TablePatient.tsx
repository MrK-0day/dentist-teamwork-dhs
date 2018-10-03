import * as React from 'react'
import { Table, Button, Popconfirm, message } from 'antd'



export const TablePatient = ({ props }: { props: any }) => {
  function handleDelete(event: any) {
    console.log(props)
    console.log(event.target)
    props.setMyState('target',event.target.value)
    props.openModal('delete')
  }
  function handleEdit(event: any) {
    console.log(event.target.value)
    props.asyncInitUpdatePatient(event.target.value)
  }
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
      key:'refBy',
      dataIndex:'refBy'
    },
    {
      title:'Actions',
      key:'actions',
      width: 170,
      render: (text: any, row: any) => (
        <span>
          <Button name='edit' value={row.id} type='primary' onClick={handleEdit}>Edit</Button>
          <Button name='delete' value={row.id} onClick={handleDelete}>Delete</Button>
        </span>
      )
    }
  ]
  return <Table bordered={true} columns={columns} dataSource={props.patientData} />
}
