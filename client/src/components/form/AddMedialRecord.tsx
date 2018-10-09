import * as React from 'react'
import { Form, Input, DatePicker, Select, TreeSelect } from 'antd'
let toothmap =  require('../../images/tooth-map.jpe')

const fake_data_Treatment = [
  {
    title: 'Răng khôn mọc lệch',
    value: 'rangkhonmoclech',
    key: 'rangkhonmoclech',
    children: [
      {
        title: 'Kháng sinh toàn thân',
        value: 'khangsinhtoanthan',
        key: 'khangsinhtoanthan',
        disableCheckbox: true
      },
      {
        title: 'Bơm rửa túi quanh răng',
        value: 'bomruatuiquanhrang',
        key: 'bomruatuiquanhrang',
        disableCheckbox: true
      },
      {
        title: 'Nhổ răng khôn mọc lệch',
        value: 'nhorangkhonmoclech',
        key: 'nhorangkhonmoclech',
        disableCheckbox: true
      }
    ]
  },
  {
    title: 'Răng khôn mọc lệch 1',
    value: 'rangkhonmoclech1',
    key: 'rangkhonmoclech1',
    children: [
      {
        title: 'Kháng sinh toàn thân 1',
        value: 'khangsinhtoanthan1',
        key: 'khangsinhtoanthan1',
        disableCheckbox: true
      },
      {
        title: 'Bơm rửa túi quanh răng 1',
        value: 'bomruatuiquanhrang1',
        key: 'bomruatuiquanhrang1',
        disableCheckbox: true
      },
      {
        title: 'Nhổ răng khôn mọc lệch 1',
        value: 'nhorangkhonmoclech1',
        key: 'nhorangkhonmoclech1',
        disableCheckbox: true
      }
    ]
  },
  {
    title: 'Răng khôn mọc lệch 2',
    value: 'rangkhonmoclech2',
    key: 'rangkhonmoclech2',
    children: [
      {
        title: 'Kháng sinh toàn thân 2',
        value: 'khangsinhtoanthan2',
        key: 'khangsinhtoanthan2',
        disableCheckbox: true
      },
      {
        title: 'Bơm rửa túi quanh răng 2',
        value: 'bomruatuiquanhrang2',
        key: 'bomruatuiquanhrang2',
        disableCheckbox: true
      },
      {
        title: 'Nhổ răng khôn mọc lệch 2',
        value: 'nhorangkhonmoclech2',
        key: 'nhorangkhonmoclech2',
        disableCheckbox: true
      }
    ]
  }
]

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  }
}

const SearchInput = ({ props }: { props: any }) => {
  function handleChange (value: any) {
    props.setState('fullname', value)
  }
  return (
    <Select
      showSearch
      value={props.fullname}
      placeholder='Full name'
      onChange={handleChange}
      optionFilterProp='children'
    >
      {props.listdatafullname.map((value: any) => {
        return (
          <Select.Option key={value.key}>{value.data}</Select.Option>
        )
      })}
    </Select>
  )
}

let listTooth: number[] = []
for (let i = 1; i <= 32; i++) listTooth.push(i)

export const AddMedialRecord = ({ props }: { props: any }) => {
  function handleChangeTreatment (value: any) {
    // console.log(value)
    props.setState('treatment', value)
  }
  function handleChange (e: any) {
    props.setState(e.target.name, e.target.value)
  }
  function handleChangeDate (date: any, dateString: any) {
    props.setState('date', date)
  }
  function handleChangeTooth (value: any) {
    let find = (v: any) => {
      for (let i in props.listtooth) {
        if (props.listtooth[i].tooth === v) return props.listtooth[i].note
      }
    }
    let data = value.map((v: any) => {
      let cc = find(v)
      return {
        tooth: v,
        note: cc
      }
    })
    props.setState('listtooth', data)
    if (value.length > props.listtooth.length) {
      // console.log(value[value.length - 1])
      props.onOpenDrawNote(value[value.length - 1])
    }
  }
  const _listtooth = props.listtooth.map((value: any) => value.tooth)
  return (
    <Form layout='horizontal' style={{ width: '100%' }}>
      <Form.Item {...formItemLayout} label='Mã Hồ  Sơ'>
        <Input type='text' value={props.mahoso} name='mahoso' onChange={handleChange} placeholder='Mã Hồ Sơ' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Bệnh Nhân'>
        <SearchInput props={props} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Ngày'>
        <DatePicker onChange={handleChangeDate} placeholder='Ngày' value={props.date} format='DD-MM-YYYY' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <img style={{ width: '100%' }} src={toothmap} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Răng'>
        <Select value={_listtooth} onChange={handleChangeTooth} mode='multiple' placeholder='Răng'>
          {listTooth.map(value => {
            return <Select.Option key={value}>{value}</Select.Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item {...formItemLayout} label='Liệu Trình'>
        <TreeSelect value={props.treatment} onChange={handleChangeTreatment} style={{ width: '100%' }} dropdownStyle={{ maxHeight: 200, overflow: 'auto' }} treeData={fake_data_Treatment} treeCheckable />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Tổng Tiền'>
        <Input type='text' value={props.cost} name='cost' onChange={handleChange} placeholder='Tổng Tiền' />
      </Form.Item>
      <Form.Item {...formItemLayout} label='Đã Thanh Toán'>
        <Input type='text' value={props.paid} name='paid' onChange={handleChange} placeholder='Đã Thanh Toán' />
      </Form.Item>
    </Form>
  )
}
