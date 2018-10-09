import * as React from 'react'
import { connect } from 'react-redux'
import { Client } from '../../../modules/apollo/apollo'
import { GQL_removeRecord, GQL_getRecordById } from '../../../modules/apollo/gql'
import { Button } from 'antd'

class actionRenderer extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }
  componentDidMount () {
  }
  componentWillUnmount () {
    this.forceUpdate()
  }
  onRemove () {
    this.removeRecord(this.props.node.data.key)
    this.props.onremoveRecord(this.props.node.data.key)
  }
  async removeRecord (payload: any) {
    await Client().mutate({
      variables: {
        _id: payload
      },
      mutation: GQL_removeRecord
    })
  }
  async onView () {
    // console.log(this.props.node.data.key)
    let _id = this.props.node.data.key
    let data = await this.getRecordById(_id)
    // console.log(data)
    await this.props.setState('datachitiet', data)
    await this.props.setState('visiblechitiet', true)
  }
  async getRecordById (payload: any) {
    let { data: { record: res } }: {data: any} = await Client().query({
      variables: {
        _id: payload
      },
      query: GQL_getRecordById
    })
    return res
  }
  render () {
    return (
      <div>
        <Button size='small' onClick={this.onRemove.bind(this)} type='danger'>Xóa</Button>
        <Button size='small' onClick={this.onView.bind(this)} type='default'>Chi Tiết</Button>
      </div>
    )
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(actionRenderer)
