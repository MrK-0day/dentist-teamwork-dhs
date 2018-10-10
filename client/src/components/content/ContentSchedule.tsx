import * as React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Row, Col } from 'antd'

import { TableSchedule } from '../ag-grid/TableSchedule'
import { ModalSchedule } from '../modal/ModalSchedule'

class ContentSchedule extends React.Component<any, any> {
  componentDidMount () {
    this.props.InitData()
  }
  async openModal () {
    await this.props.loadListbenhnhan()
    await this.props.loatListbacsi()
    await this.props.loadListphong()
    await this.props.onOpenModal()
  }
  render () {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Row gutter={10}>
            <Col span={20}><Input.Search /></Col>
            <Col span={4}><Button onClick={this.openModal.bind(this)} block icon='plus' type='primary'>Tạo Lịch Hẹn</Button></Col>
          </Row>
        </div>
        <TableSchedule props={this.props} />
        <ModalSchedule props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Schedule

const mapDispatch = (dispatch: any) => dispatch.Schedule

export default connect(mapState, mapDispatch)(ContentSchedule)
