import * as React from 'react'
import { Form, Cascader, DatePicker, Select, Input, TimePicker } from 'antd'

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  }
}

const dataGiaoDoan = [
  {
    value: 'gd1',
    label: 'Kháng sinh toàn thân',
    children: [
      {
        value: 'gd2',
        label: 'Bơm rửa túi quanh răng',
        children: [
          {
            value: 'gd3',
            label: 'Nhổ răng khôn bị lệch'
          }
        ]
      }
    ]
  }
]

const SearchInputBenhnhan = ({ props }: { props: any }) => {
  function handleChange (value: any) {
    props.setState('fullname', value)
  }
  return (
    <Select
      showSearch
      value={props.fullname}
      placeholder='Họ tên bệnh nhân'
      onChange={handleChange}
      optionFilterProp='children'
    >
      {props.listbenhnhan.map((value: any) => {
        return (
          <Select.Option key={value.key}>{value.value}</Select.Option>
        )
      })}
    </Select>
  )
}

const SearchInputBacsi = ({ props }: { props: any }) => {
  function handleChange (value: any) {
    props.setState('bacsi', value)
  }
  return (
    <Select
      showSearch
      value={props.bacsi}
      placeholder='Họ tên bác sĩ'
      onChange={handleChange}
      optionFilterProp='children'
    >
      {props.listbacsi.map((value: any) => {
        return (
          <Select.Option key={value.key}>{value.value}</Select.Option>
        )
      })}
    </Select>
  )
}

const SearchInputPhong = ({ props }: { props: any }) => {
  function handleChange (value: any) {
    props.setState('phong', value)
  }
  return (
    <Select
      showSearch
      value={props.phong}
      placeholder='Phòng'
      onChange={handleChange}
      optionFilterProp='children'
    >
      {props.listphong.map((value: any) => {
        return (
          <Select.Option key={value.key}>{value.value}</Select.Option>
        )
      })}
    </Select>
  )
}

export const AddSchedule = ({ props }: { props: any }) => {
  function handleChange (e: any) {
    props.setState(e.target.name, e.target.value)
  }
  function handleChangeDate (date: any, dateString: any) {
    props.setState('date', date)
  }
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Bệnh Nhân'>
        <SearchInputBenhnhan props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Bác Sĩ Điều Trị'>
        <SearchInputBacsi props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Giai Đoạn'>
        <Cascader options={dataGiaoDoan} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Phòng'>
        <SearchInputPhong props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Thời Gian'>
        <DatePicker onChange={handleChangeDate} value={props.date} format='DD-MM-YYYY' style={{ width: '60%' }} />
        <TimePicker style={{ width: '40%' }} format='HH:mm' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Ghi Chú'>
        <Input.TextArea name='ghichu' value={props.ghichu} onChange={handleChange} />
      </Form.Item>
    </Form>
  )
}
