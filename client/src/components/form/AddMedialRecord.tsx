import * as React from 'react'
import { Form, Input, DatePicker, Select } from 'antd'
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
          <Select.Option key={value.key}>{value.data}</Select.Option>
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
    props.setState('date', date)
  }
  function handleChangeTooth (value: any) {
    let find = (v: any) => {
      for (let i in props.listtooth) {
        if (props.listtooth[i].tooth === v) return props.listtooth[i].note
      }
    }
    let data = value.map((v: any) => {
      let cc = find(v)
      return {
        tooth: v,
        note: cc
      }
    })
    props.setState('listtooth', data)
    if (value.length > props.listtooth.length) {
      // console.log(value[value.length - 1])
      props.onOpenDrawNote(value[value.length - 1])
    }
  }
  const _listtooth = props.listtooth.map((value: any) => value.tooth)
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Mã Hồ  Sơ'>
        <Input type='text' value={props.mahoso} name='mahoso' onChange={handleChange} placeholder='Mã Hồ Sơ' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Bệnh Nhân'>
        <SearchInput props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Ngày'>
        <DatePicker onChange={handleChangeDate} placeholder='Ngày' value={props.date} format='DD-MM-YYYY' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Tổng Tiền'>
        <Input type='text' value={props.cost} name='cost' onChange={handleChange} placeholder='Tổng Tiền' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Đã Thanh Toán'>
        <Input type='text' value={props.paid} name='paid' onChange={handleChange} placeholder='Đã Thanh Toán' />
      </Form.Item>
      <Form.Item>
        <img style={{ width: '100%' }} src={toothmap} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Răng'>
        <Select value={_listtooth} onChange={handleChangeTooth} mode='multiple' placeholder='Răng'>
          {listTooth.map(value => {
            return <Select.Option key={value}>{value}</Select.Option>
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
