import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Row, Col, Divider ,Checkbox, Button, Radio, DatePicker, AutoComplete } from 'antd'

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

class PatientForm extends React.Component<any, any> {
  handleRadioChange(e : any) {
    this.props.onGenderRadioChange(e.target.value)
  }
  handleSubmit(){
    this.props.asyncAddPatient()
    console.log(this.props)
  }
  handleChange(e: any){
    console.log(e.target)
    console.log(this.props)
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
    this.props.setMyState('nationality', value)
  }
  handleCountryChangeValue(value: string) {
    this.props.setMyState('nationality', value)
  }
  render() {
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
          <Input id='phone' placeholder='Valid phone number' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} defaultValue={this.props.phone} value={this.props.phone} />
        </FormItem>
        <FormItem {...formItemLayout} label='Address'>
          <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' defaultValue={this.props.phone} value={this.props.address}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Nationality'>
          <AutoComplete
            filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            dataSource={countries}
            onSelect={this.handleCountrySelect.bind(this)}
            onChange={this.handleCountryChangeValue.bind(this)}
          ><Input placeholder='You nationality' ></Input></AutoComplete>
        </FormItem>
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
          <Input id='phone' placeholder='Valid phone number' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} value={this.props.phone} />
        </FormItem>
        <FormItem {...formItemLayout} label='Address'>
          <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' value={this.props.address}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Nationality'>
          <AutoComplete
            filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            dataSource={countries}
            defaultValue={this.props.nationality}
            onSelect={this.handleCountrySelect.bind(this)}
            onChange={this.handleCountryChangeValue.bind(this)}
          ><Input placeholder='You nationality' ></Input></AutoComplete>
        </FormItem>
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
        <h2>Are you sure to remove {this.props.fullname}</h2>
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