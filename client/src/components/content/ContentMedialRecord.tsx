import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { TableMedicalRecord } from '../table/TableMedicalRecord'
import { ModalStep } from '../modal/ModalStep'

class ContentMedialRecord extends React.Component<any, any> {
  render () {
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Button onClick={this.props.onOpenModalAdd.bind(this)} type='primary'>+</Button>
        </div>
        <TableMedicalRecord props={this.props} />
        <ModalStep props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.MedialRecord

const mapDispatch = (dispatch: any) => dispatch.MedialRecord

export default connect(mapState, mapDispatch)(ContentMedialRecord)
