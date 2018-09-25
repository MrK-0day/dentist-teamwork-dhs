import * as React from 'react'
import { Drawer, Form, Input, Select } from 'antd'

const _ListInput = [
  {
    lable: 'Patient',
    name: 'patient',
    type: 'text'
  },
  {
    lable: 'Record',
    name: 'record',
    type: 'text'
  },
  {
    lable: 'Code',
    name: 'code',
    type: 'text'
  },
  {
    lable: 'Step',
    name: 'step',
    type: 'select'
  }
]

export const DrawerAddMedialRecord = ({ props }: { props: any }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 - 6 }
  }
  return (
    <Drawer
      title='Add Medial Record'
      placement='right'
      closable={false}
      onClose={props.onCloseModalAdd}
      visible={props.visible}
      width='20%'
    >
      <Form layout='horizontal'>
        {_ListInput.map((value, index) => {
          return (
            <Form.Item key={index} {...formItemLayout} label={`${value.lable} : `}>
              {value.type === 'text' && <Input name={value.name} />}
              {value.type === 'select' && <Select />}
            </Form.Item>
          )
        })}
      </Form>
    </Drawer>
  )
}
