import * as React from 'react'
import { connect } from 'react-redux'
import { Client } from '../../../modules/apollo/apollo'
import { GQL_removeRecord } from '../../../modules/apollo/gql'
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
  render () {
    return <Button size='small' onClick={this.onRemove.bind(this)} type='danger'>Xóa</Button>
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(actionRenderer)
