import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Row, Col, Divider ,Checkbox, Button, Radio, DatePicker } from 'antd'

import { phone_prefixes, countries } from '../misc/regionData'
import { DateFormat } from '../misc/const'
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
  }
}

const jobLists = ['Student','Woker']

class PatientForm extends React.Component<any, any> {
  handleRadioChange(e : any) {
    this.props.onGenderRadioChange(e.target.value)
  }
  handleSubmit(){
    this.props.asyncAddPatient()
    console.log(this.props)
  }
  handleChange(e: any){
    this.props.setMyState(e.target.id,e.target.value)
  }
  handleDateChange(date: any, dateString: string) {
    let selected = dateString.split('-')
    const selectedDate = moment().set({
      'date': +selected[0],
      'month': +selected[1] - 1,
      'year': +selected[2],
      'hour': 0,
      'minute': 0,
      'second': 0
    }).unix()
    console.log(selectedDate)
    const converted = moment(selectedDate*1000).format(`DD-MM-YYYY`)
    console.log(converted)
    this.props.setMyState('dob',selectedDate)
  }
  handleCountrySelect(value: string){
    this.props.setMyState('nationality',countries[Number(value)].name)
  }
  handleJobSelect(value:string){
    this.props.setMyState('career',jobLists[Number(value)])
  }
  render() {
    const prefixSelector = <Select defaultValue="+84" >
    {phone_prefixes.map((value: any, index: number) => {
        return <Option key={index}>{value.prefix}</Option>
    })}
    </Select>

    const countrySelector = <Select  onSelect={this.handleCountrySelect.bind(this)} placeholder='Select country'>
    {countries.map((value: any, index: any)=>{
        return <Option key={index}>{value.name}</Option>
    })}
    </Select>

    const AddForm = (
      <Form layout='horizontal'>
        <FormItem {...formItemLayout} label='Name'>
          <Input id='fullname' placeholder='Full Name' onChange={this.handleChange.bind(this)} value={this.props.fullname}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Gender'>
          <RadioGroup onChange={this.handleRadioChange.bind(this)} value={this.props.genderRadio}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
            <Radio value={'other'}>Other</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label='Birthdate'>
          <DatePicker onChange={this.handleDateChange.bind(this)} defaultValue={moment()} format={DateFormat} style={{width: '100%'}}/>
        </FormItem>
        <FormItem {...formItemLayout} label='E-mail'>
          <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc' onChange={this.handleChange.bind(this)} defaultValue={this.props.email} value={this.props.email}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Phone'>
          <Input id='phone' placeholder='Valid phone number' onChange={this.handleChange.bind(this)} addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={this.props.phone} value={this.props.phone} />
        </FormItem>
        <FormItem {...formItemLayout} label='Address'>
          <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' defaultValue={this.props.phone} value={this.props.address}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Nationality'>{countrySelector}</FormItem>
        <FormItem {...formItemLayout} label='Career'>
          <Input id='career' placeholder='Your current job' onChange={this.handleChange.bind(this)} defaultValue={this.props.career} value={this.props.career}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Referer'>
          <Input id='refBy' onChange={this.handleChange.bind(this)} defaultValue={this.props.refBy} value={this.props.refBy}/>
        </FormItem>
      </Form>
    )

    const EditForm = (
      <Form layout='horizontal'>
        <FormItem {...formItemLayout} label='Name'>
          <Input id='fullname' placeholder='Full Name' onChange={this.handleChange.bind(this)} defaultValue={this.props.fullname} value={this.props.fullname}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Gender'>
          <RadioGroup onChange={this.handleRadioChange.bind(this)} defaultValue={this.props.gender} value={this.props.genderRadio}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
            <Radio value={'other'}>Other</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label='Birthdate'>
          <DatePicker onChange={this.handleDateChange.bind(this)} defaultValue={moment()} format={DateFormat} style={{width: '100%'}}/>
        </FormItem>
        <FormItem {...formItemLayout} label='E-mail'>
          <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc' onChange={this.handleChange.bind(this)} value={this.props.email}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Phone'>
          <Input id='phone' placeholder='Valid phone number' onChange={this.handleChange.bind(this)} addonBefore={prefixSelector} style={{ width: '100%' }} value={this.props.phone} />
        </FormItem>
        <FormItem {...formItemLayout} label='Address'>
          <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' value={this.props.address}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Nationality'>{countrySelector}</FormItem>
        <FormItem {...formItemLayout} label='Career'>
          <Input id='career' placeholder='Your current job' onChange={this.handleChange.bind(this)} defaultValue={this.props.career} value={this.props.career}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Referer'>
          <Input id='refBy' onChange={this.handleChange.bind(this)} value={this.props.refBy}/>
        </FormItem>
      </Form>
    )

    const DeleteForm = (
      <div>
        <h2>Are you sure xyz to delete</h2>
      </div>
    )
    if(this.props.targetModal == 'add') return AddForm
    else if(this.props.targetModal =='edit') return EditForm
    else if (this.props.targetModal == 'delete') return DeleteForm
    else return (<div></div>)
  }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState,mapDispatch)(PatientForm)
