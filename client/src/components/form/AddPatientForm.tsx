import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Row, Col, Checkbox, Button, Radio } from 'antd'

import { phone_prefixes, countries } from '../misc/regionData'
import { stat } from 'fs'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

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
        const prefixSelector = <Select defaultValue="+84" >
        {phone_prefixes.map((value: any, index: number) => {
            return <Option key={index}>{value.prefix}</Option>
        })}
        </Select>

        const countrySelector = <Select placeholder='Select country'>
        {countries.map((value: any, index: any)=>{
            return <Option key={index}>{value.name}</Option>
        })}
        </Select>

        const jobSelector = <Select placeholder='Choose your job'>
            <Option key={1}>
                Engineer
            </Option>
            <Option key={2}>
                Doctor
            </Option>
            <Option key={3}>
                Government Emp.
            </Option>
        </Select>

        return(
        <Form layout='horizontal'>
            <FormItem {...formItemLayout} label='Name'>
                <Input id='fullname' placeholder='Full Name'/>
            </FormItem>
            <FormItem label='Gender'>
                <RadioGroup value={this.props.genderValue}>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                    <Radio value={3}>Other</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label='E-mail'>
                <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc'/>
            </FormItem>
            <FormItem {...formItemLayout} label='Phone'>
                <Input placeholder='Valid phone number' addonBefore={prefixSelector} style={{ width: '100%' }} />
            </FormItem>
            <FormItem {...formItemLayout} label='Address'>
                <Input placeholder='Full address' />
            </FormItem>
            <Row>
                <Col span={12}><FormItem {...formItemLayout}>{countrySelector}</FormItem></Col>
                <Col span={12}><FormItem {...formItemLayout}>{jobSelector}</FormItem></Col>
            </Row>
            <FormItem {...formItemLayout} label='Referer (optional)'>
                <Input />
            </FormItem>
            <FormItem {...formItemLayout}>
                <Checkbox>Register for Promotions and emails</Checkbox>
            </FormItem>
        </Form>
        )
    }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState,mapDispatch)(AddPatientForm)