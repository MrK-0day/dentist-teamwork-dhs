import * as React from 'react'
import { Form, Input, DatePicker, Select } from 'antd'
let moment = require('moment')
let toothmap =  require('../../images/tooth-map.jpe')

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  }
}

const SearchInput = ({ props }: { props: any }) => {
  function handleChange (value: any) {
    props.setState('fullname', value)
  }
  return (
    <Select
      showSearch
      value={props.fullname}
      placeholder='Full name'
      onChange={handleChange}
      optionFilterProp='children'
    >
      {props.listdatafullname.map((value: any) => {
        return (
          <Select.Option key={value}>{value}</Select.Option>
        )
      })}
    </Select>
  )
}

let listTooth: number[] = []
for (let i = 1; i <= 32; i++) listTooth.push(i)

export const AddMedialRecord = ({ props }: { props: any }) => {
  function handleChange (e: any) {
    props.setState(e.target.name, e.target.value)
  }
  function handleChangeDate (date: any, dateString: any) {
    props.setState('date', dateString)
  }
  function handleChangeTooth (value: any) {
    let data = value.map((v: any) => {
      return {
        tooth: v,
        note: ''
      }
    })
    props.setState('listtooth', data)
    if (value.length < props.listtooth.length) {
      console.log(value)
    }
  }
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Bệnh Nhân'>
        <SearchInput props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Ngày'>
        <DatePicker onChange={handleChangeDate} placeholder='Date' defaultValue={moment()} format='DD-MM-YYYY' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Tổng Tiền'>
        <Input type='text' value={props.cost} name='cost' onChange={handleChange} placeholder='Cost' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Đã Thanh Toán'>
        <Input type='text' value={props.paid} name='paid' onChange={handleChange} placeholder='Paid' />
      </Form.Item>
      <Form.Item>
        <img style={{ width: '100%' }} src={toothmap} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Răng'>
        <Select defaultValue={[]} onChange={handleChangeTooth} mode='multiple' placeholder='Tooth'>
          {listTooth.map(value => {
            return <Select.Option key={value}>{value}</Select.Option>
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
