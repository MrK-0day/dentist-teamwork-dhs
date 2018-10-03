import * as React from 'react'
import { connect } from 'react-redux'

import  TableDoctor  from '../table/TableDoctor'
// import { ModalDoctor } from '../modal/ModalDoctor'
import { Button, Row, Col, Input } from 'antd';

const Search = Input.Search
class ContentDoctor extends React.Component<any, any> {
  // componentDidMount() {
  //   this.props.asyncInitData()
  // }
  render () {
    console.log(this.props.targetModal)
    return (
      <div>
        <TableDoctor props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Doctor

const mapDispatch = (dispatch: any) => dispatch.Doctor

export default connect(mapState, mapDispatch)(ContentDoctor)
