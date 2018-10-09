import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Icon, Row, Col, Divider ,Checkbox, Button, Radio, DatePicker, AutoComplete } from 'antd'

import { phone_prefixes, countries } from '../misc/regionData'
import { DateFormat } from '../misc/const'
import TextArea from 'antd/lib/input/TextArea';
let moment = require('moment')

const FormItem = Form.Item
const RadioGroup = Radio.Group

let uuid = 0

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 18 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 20 },
//     sm: { span: 18 }
//   }
// }
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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 18, offset: 0 },
    sm: { span: 18, offset: 4 },
  },
}

class iPatientForm extends React.Component<any, any> {
  handleRadioChange(e : any) {
    this.props.onGenderRadioChange(e.target.value)
  }
  handleChange(e: any){
    // console.log(e.target)
    // console.log(this.props)
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
  handleHistorySave(e: any) {
    console.log(e)
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
        var medicalHistory = values.records.filter((i: any)=> {return i})
        this.props.setMyState('medicalHistory',medicalHistory)
      }
    })
  }
  render() {
    const { form } = this.props
    function addField () {
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(uuid)
      uuid++
      form.setFieldsValue({
        keys: nextKeys,
      });
    }
    function removeField (k: any ){
      const keys = form.getFieldValue('keys')
      if(keys.length === 1) return
      form.setFieldsValue({
        keys: keys.filter((key: any) => key!== k )
      })
    }
    const { getFieldDecorator, getFieldValue } = this.props.form

    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const dynamicFields = keys.map((k: any, index: any)=>{
      return (
        <FormItem
          {...historyLayout}
          label=' '
          required={false}
          key={k}
          colon={false}
          style={{marginLeft: '8%'}}
        >
          {getFieldDecorator(`records[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: 'Input',
            }],
          })(
            <Input placeholder={'Mục ' + index} style={{width: '95%'}}/>
          )}
          {keys.length > 1 ? (
            <Icon
              className='dynamic-delete-button'
              type='minus-circle-o'
              onClick={() => removeField(k)}
            />
          ) : null}
        </FormItem>
      )
    })
    const AddForm = (
      <Form layout='horizontal'>
        <FormItem label='Họ tên'>
          <Input id='fullname' placeholder='Họ tên' onChange={this.handleChange.bind(this)} value={this.props.fullname}/>
        </FormItem>
        <FormItem {...formItemLayout} label='Giới tính'>
          <RadioGroup onChange={this.handleRadioChange.bind(this)} value={this.props.genderRadio}>
            <Radio value={'male'}>Nam</Radio>
            <Radio value={'female'}>Nữ</Radio>
            <Radio value={'other'}>Khác</Radio>
          </RadioGroup>
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
          <Input id='address' onChange={this.handleChange.bind(this)} placeholder='Full address' defaultValue={this.props.phone} value={this.props.address}/>
        </FormItem>
        <FormItem label='Quốc gia'>
          <AutoComplete
            filterOption={(inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            dataSource={countries}
            onSelect={this.handleCountrySelect.bind(this)}
            onChange={this.handleCountryChangeValue.bind(this)}
          ><Input placeholder='Nơi định cư' ></Input></AutoComplete>
        </FormItem>
        <FormItem label='Nghề nghiệp'>
          <Input id='career' placeholder='Nghề nghiệp hiện tại' onChange={this.handleChange.bind(this)} defaultValue={this.props.career} value={this.props.career}/>
        </FormItem>
        <FormItem label='Người giới thiệu'>
          <Input id='refBy' onChange={this.handleChange.bind(this)} value={this.props.refBy}/>
        </FormItem>
        <FormItem label='Lịch sử bệnh án' >
          {dynamicFields}
          <Button hidden={this.props.saveBtnHide} size='small' type='dashed' onClick={this.handleHistorySave.bind(this)}>LƯU</Button>
        </FormItem>
        <FormItem>
          <Button type="dashed" onClick={addField} style={{ width: '100%' }}>
            <Icon type="plus" /> Thêm lịch sử bệnh án
          </Button>
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
    else if(this.props.targetModal =='ediarr = arr.filter(function(e){return e});t') return EditForm
    else if (this.props.targetModal == 'delete') return DeleteForm
    else return (<div></div>)
  }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

var PatientForm = Form.create({})(iPatientForm)

export default connect(mapState,mapDispatch)(PatientForm)