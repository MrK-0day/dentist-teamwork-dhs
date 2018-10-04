import * as React from 'react'
import { connect } from 'react-redux'
 import { TableDoctor } from '../table/TableDoctor'
// import { ModalDoctor } from '../modal/ModalDoctor'
import { Button, Row, Col, Input } from 'antd';
 const Search = Input.Search
class ContentDoctor extends React.Component<any, any> {
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
        <TableDoctor props={this.props} />
      </div>
    )
  }
}
 const mapState = (state: any) => state.Doctor
 const mapDispatch = (dispatch: any) => dispatch.Doctor
 export default connect(mapState, mapDispatch)(ContentDoctor)