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
        const { form } = this.props

        //RENDER
        return(<p>Hello World</p>)
    }
}

//EXPORTS
const mapState = (state: any) => state.Doctor

const mapDispatch = (dispatch: any) => dispatch.Doctor

var DoctorForm = Form.create({})(iDoctorForm)

export default connect(mapState,mapDispatch)(DoctorForm)