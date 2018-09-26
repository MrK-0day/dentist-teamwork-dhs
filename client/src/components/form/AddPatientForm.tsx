import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Row, Col, Checkbox, Button, Radio, DatePicker } from 'antd'

import { phone_prefixes, countries } from '../misc/regionData'
let moment = require('moment')

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
    handleRadioChange(e : any) {
        this.props.onGenderRadioChange(e.target.value)
    }
    render() {
        console.log(moment())
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
            <Option key={4}>
                Student
            </Option>
            <Option key={5}>
                Other
            </Option>
        </Select>

        const dateFormat = 'DD/MM/YYYY'
        return(
        <Form layout='horizontal'>
            <FormItem {...formItemLayout} label='Name'>
                <Input id='fullname' placeholder='Full Name'/>
            </FormItem>
            <FormItem {...formItemLayout} label='Gender'>
                <RadioGroup onChange={this.handleRadioChange.bind(this)} value={this.props.genderRadio}>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                    <Radio value={3}>Other</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label='Birthdate'>
                <DatePicker defaultValue={moment()} format={dateFormat} style={{width: '100%'}}/>
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
                <Col span={12}><FormItem {...formItemLayout} style={{width: 300, alignSelf:'center'}}>{countrySelector}</FormItem></Col>
                <Col span={12}><FormItem {...formItemLayout} style={{width: 300,  alignSelf:'center'}}>{jobSelector}</FormItem></Col>
            </Row>
            <FormItem {...formItemLayout} label='Referer'>
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