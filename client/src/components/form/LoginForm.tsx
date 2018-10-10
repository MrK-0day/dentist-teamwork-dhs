import * as React from 'react'
import { Form, Input, Button, Icon } from 'antd'

export const LoginForm = ({ props }: { props: any }) => {
  function handleChange (e: any) {
    props.setState(e.target.name, e.target.value)
  }
  function onClickLogin () {
    props.onLogin(props.history)
  }
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item>
        <Input onChange={handleChange} value={props.username} name='username' type='text' prefix={<Icon type='user' />} placeholder='Tài Khoản' />
      </Form.Item>
      <Form.Item>
        <Input onChange={handleChange} value={props.password} name='password' type='password' prefix={<Icon type='lock' />} placeholder='Mật Khẩu' />
      </Form.Item>
      <Form.Item>
        <Button onClick={onClickLogin} type='primary' ghost block>  Đăng Nhập</Button>
      </Form.Item>
    </Form>
  )
}
