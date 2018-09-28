import * as React from 'react'
import { Drawer, Form, Input, Button } from 'antd'

export const DrawerAddNoteTooth = ({ props }: { props: any }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 - 6 }
  }
  function handleChange (e: any) {
    props.setState(e.target.name, e.target.value)
  }
  function onCloseOK () {
    props.onCloseDrawNode('OK')
  }
  return (
    <Drawer
      title={`Thêm Ghi Chú Răng ${props.notecount}`}
      placement='right'
      closable={false}
      visible={props.visibletooth}
      // onClose={props.onCloseDrawNode}
      width='25%'
    >
      <Form layout='horizontal' style={{ width: '100%' }}>
        {props.visibletooth && <Form.Item><Input.TextArea autoFocus value={props.notetext} name='notetext' onChange={handleChange} rows={12} /></Form.Item>}
        <Button style={{ float: 'left' }} type='danger' onClick={props.onCloseDrawNode}>Hủy</Button>
        <Button style={{ float: 'right' }} type='primary' onClick={onCloseOK}>Thêm</Button>
      </Form>
    </Drawer>
  )
}
