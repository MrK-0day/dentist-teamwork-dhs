import * as React from 'react'
import { Client } from '../../../modules/apollo/apollo'
import { GQl_editRecord } from '../../../modules/apollo/gql'
import { Input } from 'antd'

class costEditor extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: props.node.data.cost,
      textInput: React.createRef()
    }
    this.onFocus = this.onFocus.bind(this)
  }
  handleChange (e: any) {
    let cost = e.target.value.replace(/[\D\s\._\-]+/g, '')
    cost = cost ? parseInt(cost, 10) : 0
    cost = cost.toLocaleString('vi-VN')
    this.setState({value: cost})
  }
  componentDidMount () {
    this.onFocus()
    // this.forceUpdate()
  }
  componentWillUnmount () {
    this.forceUpdate()
  }
  getValue () {
    let data = {
      ...this.props.node.data,
      cost: this.state.value
    }
    this.updateMedialRecord(data)
    return this.state.value
  }
  onFocus () {
    this.state.textInput.current.focus()
  }
  async updateMedialRecord (payload: any) {
    await Client().mutate({
      variables: {
        _id: payload.key,
        patientId: payload.userid,
        recordNumber: payload.recordNumber,
        cost: payload.cost,
        no: payload.no,
        paid: payload.paid,
        teeth: payload.teeth,
        treatment: '{}',
        doctorId: '5badf119883e91274201b543',
        createdDate: payload.createdDate
      },
      mutation: GQl_editRecord
    })
  }
  render () {
    return <Input ref={this.state.textInput} style={{ width: '100%' }} value={this.state.value} onChange={this.handleChange.bind(this)} />
  }
}

export default costEditor
