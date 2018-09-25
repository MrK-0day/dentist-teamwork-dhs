import * as React from 'react'
import { connect } from 'react-redux'

import { TablePatient } from '../table/TablePatient'

class ContentPatient extends React.Component<any, any> {
  render () {
    return (
      <div>
        <TablePatient props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Patient

const mapDispatch = (dispatch: any) => dispatch.Patient

export default connect(mapState, mapDispatch)(ContentPatient)
