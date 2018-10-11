import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Icon, Row, Col, Divider ,Checkbox, Button, Radio, DatePicker, AutoComplete } from 'antd'

import { phone_prefixes, countries } from '../misc/regionData'
import { DateFormat } from '../misc/const'
let moment = require('moment')

//CONST
const FormItem = Form.Item
const RadioGroup = Radio.Group
const formItemLayout = {
    labelCol: {
      sm: { span: 4 }
    },
    wrapperCol: {
      sm: { span: 20 }
    }
}
const historyLayout = {
    labelCol: {
        sm: { span : 0 }
    },
    wrapperCol: {
        sm: { span: 22 }
    }
}
let uuid = 0

//CLASS
class iDoctorForm extends React.Component<any, any> {
    //METHODS
    handleRadioChange(e: any) {
        this.props.onGenderRadioChange(e.target.value)
    }
    handleChange(e: any) {
        this.props.setMyState(e.target.id,e.target.value)
    }
    handleCountrySelect(value: string){
        this.props.setMyState('nationality', value)
    }
    handleCountryChangeValue(value: string) {
        this.props.setMyState('nationality', value)
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
        // console.log(selectedDate)
        const converted = moment(selectedDate*1000).format(`DD-MM-YYYY`)
        // console.log(converted)
        this.props.setMyState('dob',selectedDate)
    }

    render(){
      //CONST
      const { form } = this.props
      //ADDON

      //SUB COMPONENTS
      const countryAutoComplete = (
        <AutoComplete
          filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          dataSource={countries}
          onSelect={this.handleCountrySelect.bind(this)}
          onChange={this.handleCountryChangeValue.bind(this)}
        ><Input placeholder='Nơi định cư' ></Input></AutoComplete>
      )
      const EditForm = (
        <Form layout='horizontal'>
          <FormItem label='Họ tên'>
            <Input id='fullname' placeholder='Họ tên' onChange={this.handleChange.bind(this)} defaultValue={this.props.fullname} value={this.props.fullname}/>
          </FormItem>
          <FormItem {...formItemLayout} label='Giới tính'>
            <RadioGroup onChange={this.handleRadioChange.bind(this)} defaultValue={this.props.gender} value={this.props.gender}>
              <Radio value={'male'}>Nam</Radio>
              <Radio value={'female'}>Nữ</Radio>
              <Radio value={'other'}>Khác</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Input id='username' placeholder='=Tên đăng nhập'></Input>
          </FormItem>
          <FormItem>
            <Input id='password' type='password'></Input>
          </FormItem>
          <FormItem label='Ngày sinh'>
            <DatePicker onChange={this.handleDateChange.bind(this)} defaultValue={moment()} format={DateFormat} style={{width: '100%'}}/>
          </FormItem>
          <FormItem label='E-mail'>
            <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc' onChange={this.handleChange.bind(this)} defaultValue={this.props.email} value={this.props.email}/>
          </FormItem>
          <FormItem label='SDT'>
            <Input id='phone' placeholder='SDT liên lạc' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} defaultValue={this.props.phone} value={this.props.phone} />
          </FormItem>
          <FormItem label='Địa chỉ'>
            <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' defaultValue={this.props.address} value={this.props.address}/>
          </FormItem>
          <FormItem label='Quốc gia'>
            {countryAutoComplete}
          </FormItem>
          <FormItem label='Chuyên khoa'>
            <Input id='career' placeholder='Chuyên khoa hiện tại' onChange={this.handleChange.bind(this)} defaultValue={this.props.specialize} value={this.props.specialize}/>
          </FormItem>
        </Form>
      )
      const AddForm = (
        <Form layout='horizontal'>
          <FormItem label='Họ tên'>
            <Input id='fullname' placeholder='Họ tên' onChange={this.handleChange.bind(this)} value={this.props.fullname}/>
          </FormItem>
          <FormItem {...formItemLayout} label='Giới tính'>
            <RadioGroup onChange={this.handleRadioChange.bind(this)} value={this.props.gender}>
              <Radio value={'male'}>Nam</Radio>
              <Radio value={'female'}>Nữ</Radio>
              <Radio value={'other'}>Khác</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Input id='username' placeholder='=Tên đăng nhập'></Input>
          </FormItem>
          <FormItem>
            <Input id='password' type='password'></Input>
          </FormItem>
          <FormItem label='Ngày sinh'>
            <DatePicker onChange={this.handleDateChange.bind(this)} defaultValue={moment()} format={DateFormat} style={{width: '100%'}}/>
          </FormItem>
          <FormItem label='E-mail'>
            <Input id='email' placeholder='E-mail e.g aaa@bbb.ccc' onChange={this.handleChange.bind(this)} value={this.props.email}/>
          </FormItem>
          <FormItem label='SDT'>
            <Input id='phone' placeholder='SDT liên lạc' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} value={this.props.phone} />
          </FormItem>
          <FormItem label='Địa chỉ'>
            <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' value={this.props.address}/>
          </FormItem>
          <FormItem label='Quốc gia'>
            {countryAutoComplete}
          </FormItem>
          <FormItem label='Chuyên khoa'>
            <Input id='career' placeholder='Chuyên khoa hiện tại' onChange={this.handleChange.bind(this)} value={this.props.specialize}/>
          </FormItem>
        </Form>
      )
      const DeleteForm = (
        <div>
          <h2>Are you sure to remove {this.props.fullname}</h2>
        </div>
      )

      //RENDER
      if(this.props.targetModal == 'add') return AddForm
      else if(this.props.targetModal =='edit') return EditForm
      else if (this.props.targetModal == 'delete') return DeleteForm
      else return (<div></div>)
    }
}

//EXPORTS
const mapState = (state: any) => state.Doctor

const mapDispatch = (dispatch: any) => dispatch.Doctor

var DoctorForm = Form.create({})(iDoctorForm)

export default connect(mapState,mapDispatch)(DoctorForm)