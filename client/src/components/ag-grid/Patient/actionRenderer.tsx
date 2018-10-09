import * as React from 'react'
import { connect } from 'react-redux'
import { Client } from '../../../modules/apollo/apollo'
import { GQL_removeRecord } from '../../../modules/apollo/gql'
import { Button } from 'antd'

class actionRenderer extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }
  componentWillUnmount () {
    this.forceUpdate()
  }
  handleDelete (event: any) {
    console.log(this.props.node.data.fullname)
    console.log(event.target)
    this.props.setMyState('target',this.props.node.data.id)
    this.props.setMyState('fullname',this.props.node.data.fullname)
    this.props.openModal('delete')
  }
  handleUpdate(event: any) {
    console.log(this.props.node.data.id)
    this.props.asyncInitUpdatePatient(this.props.node.data.id)
  }
  render () {
    return(
      <span>
        <Button name='edit' size='small' type='primary' onClick={this.handleUpdate.bind(this)}>Sửa</Button>
        <Button name='delete' size='small' onClick={this.handleDelete.bind(this)}>Xóa</Button>
      </span>
      )
  }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState, mapDispatch)(actionRenderer)
