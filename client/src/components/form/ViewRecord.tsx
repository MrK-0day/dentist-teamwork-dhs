import * as React from 'react'
import { Form, Input, DatePicker, Select, TreeSelect } from 'antd'

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  }
}

export const ViewRecord = ({ props }: { props: any }) => {
  let listteeth = JSON.parse(props.datachitiet.teeth)
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Mã Hồ  Sơ'>{props.datachitiet.recordNumber}</Form.Item>
      <Form.Item {...formItemLayout} label='Tên Bệnh Nhân'>{props.datachitiet.patient.fullname}</Form.Item>
      <Form.Item {...formItemLayout} label='Bác Sĩ Điều Trị'>{props.datachitiet.doctor.fullname}</Form.Item>
      <Form.Item {...formItemLayout} label='Số Lần Khám'>{props.datachitiet.no}</Form.Item>
      <Form.Item {...formItemLayout} label='Giai Đoạn'>0</Form.Item>
      {listteeth.map((value: any, index: any) => {
        return (
          <Form.Item {...formItemLayout} label={`Răng số ${value.tooth}`} key={index}>{value.note}</Form.Item>
        )
      })}
      <Form.Item {...formItemLayout} label='Tổng Tiền'>{props.datachitiet.cost} đ</Form.Item>
      <Form.Item {...formItemLayout} label='Đã Thanh Toán'>{props.datachitiet.paid} đ</Form.Item>
    </Form>
  )
}