import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col } from 'antd'

import { TableMedicalRecord } from '../table/TableMedicalRecord'
import { ModalStep } from '../modal/ModalStep'
import { DrawerAddMedialRecord } from '../drawer/DrawerAddMedialRecord'

class ContentMedialRecord extends React.Component<any, any> {
  render () {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Row gutter={10}>
            <Col span={20}>
              <Input.Search />
            </Col>
            <Col span={4}>
              <Button block onClick={this.props.onOpenModalAdd.bind(this)} type='primary'>
                Add Medial Record
              </Button>
            </Col>
          </Row>
        </div>
        <TableMedicalRecord props={this.props} />
        {/* <ModalStep props={this.props} /> */}
        <DrawerAddMedialRecord props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(ContentMedialRecord)
