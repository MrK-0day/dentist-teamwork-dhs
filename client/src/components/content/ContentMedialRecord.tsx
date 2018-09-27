import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col } from 'antd'

import { TableMedicalRecord } from '../table/TableMedicalRecord'
import { ModalMedialRecord } from '../modal/ModalMedialRecord'

class ContentMedialRecord extends React.Component<any, any> {
  render () {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Row gutter={10}>
            <Col span={20}><Input.Search /></Col>
            <Col span={4}><Button block onClick={this.props.onOpenModalAdd.bind(this)} icon='plus' type='primary'>Tạo Hồ Sơ Bệnh Án</Button>
            </Col>
          </Row>
        </div>
        <TableMedicalRecord props={this.props} />
        <ModalMedialRecord props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(ContentMedialRecord)
