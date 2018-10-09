import * as React from 'react'
import { Form, Cascader, DatePicker, Select } from 'antd'

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

export const AddSchedule = ({ props }: { props: any }) => {
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Hồ Sơ Điều Trị'>
        <Select />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Bác Sĩ Điều Trị'>
        <Select />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Giai Đoạn'>
        <Cascader options={dataGiaoDoan} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Phòng'>
        <Select />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Thời Gian'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  )
}
