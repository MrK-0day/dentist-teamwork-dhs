//lib
import * as React from 'react'
//framework
import { Table, Button } from 'antd'

const columns = [
  {
    title:'Name',
    key:'fullname',
    dataIndex:'fullname'
  },
  {
    title:'Gender',
    key:'gender',
    dataIndex:'gender'
  },
  {
    title:'Birthdate',
    key:'dob',
    dataIndex:'dob'
  },
  {
    title:'Job',
    key:'career',
    dataIndex:'carrer'
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
    render: () => (
      <span><Button>Edit</Button><Button>Delete</Button></span>
    )
  }
]

class Patient extends React.Component<any, any> {
    componentWillMount () {
      this.props.setState('isSelectMenuItem', 'quanlybenhnhan')
    }
    render () {
      return (
        <div>
          <Table columns={columns}/>
        </div>
      )
    }
}

export default Patient