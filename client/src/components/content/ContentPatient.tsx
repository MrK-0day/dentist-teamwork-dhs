import * as React from 'react'
import { connect } from 'react-redux'

import { TablePatient } from '../table/TablePatient'
import { ModalPatient } from '../modal/ModalPatient'
import { Button, Row, Col, Input } from 'antd';

const Search = Input.Search
class ContentPatient extends React.Component<any, any> {
  render () {
    return (
      <div>
        <Row className='patient-table-header'>
          <Col span={12}><Search placeholder='Patient code' style={{width:600}} enterButton='Search'></Search></Col>
          <Col span={12}><Button className='patient-header-btn' type="primary" icon="plus" onClick={this.props.openAddModal.bind(this)} >Add Patient</Button></Col>
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
