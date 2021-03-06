import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col } from 'antd'

import { TableRecord } from '../ag-grid/TableRecord'
import { ModalMedialRecord } from '../modal/ModalMedialRecord'
import { ModalViewRecord } from '../modal/ModalViewRecord'

class ContentMedialRecord extends React.Component<any, any> {
  componentDidMount () {
    this.props.InitMedialRecord()
    // console.log(this.props.listdatarecord)
  }
  OpenModalTaoHoSoBenhAn () {
    this.props.InitData()
    this.props.onOpenModalAdd()
  }
  render () {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Row gutter={10}>
            <Col span={20}><Input.Search /></Col>
            <Col span={4}><Button block onClick={this.OpenModalTaoHoSoBenhAn.bind(this)} icon='plus' type='primary'>Tạo Hồ Sơ Bệnh Án</Button></Col>
          </Row>
        </div>
        <TableRecord props={this.props} />
        <ModalMedialRecord props={this.props} />
        <ModalViewRecord props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(ContentMedialRecord)
