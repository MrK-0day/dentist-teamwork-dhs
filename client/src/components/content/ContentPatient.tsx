import * as React from 'react'
import { connect } from 'react-redux'

import { TablePatient } from '../ag-grid/TablePatient'
import { ModalPatient } from '../modal/ModalPatient'
import { Button, Row, Col, Input } from 'antd';

const Search = Input.Search
class ContentPatient extends React.Component<any, any> {
  componentDidMount() {
    this.props.asyncInitData()
  }
  render () {
    console.log(this.props.targetModal)
    return (
      <div>
        <Row gutter={10} className='patient-table-header'>
          <Col span={20}><Search placeholder='Patient code'></Search></Col>
          <Col span={4}><Button className='patient-header-btn' type='primary' icon='plus' onClick={()=>this.props.openModal('add')} >Add Patient</Button></Col>
        </Row>
        <ModalPatient props={this.props} />
        <TablePatient props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState, mapDispatch)(ContentPatient)
