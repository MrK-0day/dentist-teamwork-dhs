import * as React from 'react'
import { Table, Button, Modal } from 'antd'



export const TablePatient = ({ props }: { props: any }) => {
  function handleClick(event: any) {
    console.log(props)
    console.log(event.target)
    if(event.target.name=='delete') {
      props.asyncDeletePatient(event.target.value)
      props.asyncInitData()
    }
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
        <span><Button name='edit' value={row.id} type='primary' onClick={handleClick}>Edit</Button><Button name='delete' value={row.id} onClick={handleClick}>Delete</Button></span>
      )
    }
  ]
  return <Table bordered={true} columns={columns} dataSource={props.patientData} />
}
