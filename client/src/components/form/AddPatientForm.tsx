import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd'

import { region, phone_prefixes } from '../misc/regionData'
import { stat } from 'fs'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
    labelCol: {
      xs: { span: 20 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 18 },
    },
};

class AddPatientForm extends React.Component<any, any> {
    render() {
        const prefixSelector = <Select defaultValue="+84" >{phone_prefixes.map((value: any, index: number) => {
            return <Option key={index}>{value.prefix}</Option>
        })}</Select>
        return(
        <Form layout='horizontal'>
            <FormItem {...formItemLayout} label='Name'>
                <Input id='fullname' placeholder='Full Name'/>
            </FormItem>
            <FormItem {...formItemLayout} label='E-mail'>
                <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc'/>
            </FormItem>
            <FormItem {...formItemLayout} label='Phone'>
                    <Input placeholder='Valid phone number' addonBefore={prefixSelector} style={{ width: '100%' }} />
            </FormItem>
            <Row>
                <Col span={12}><FormItem {...formItemLayout} label='abc'><Input/></FormItem></Col>
                <Col span={12}><FormItem {...formItemLayout} label='abc'><Input /></FormItem></Col>
            </Row>
        </Form>
        )
    }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState,mapDispatch)(AddPatientForm)