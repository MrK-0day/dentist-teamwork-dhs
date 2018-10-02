import * as React from 'react'
import { connect } from 'react-redux'

import { TableSchedule } from '../ag-grid/TableSchedule'

class ContentSchedule extends React.Component<any, any> {
  componentDidMount () {
    this.props.InitData()
  }
  render () {
    return (
      <TableSchedule props={this.props} />
    )
  }
}

const mapState = (state: any) => state.Schedule

const mapDispatch = (dispatch: any) => dispatch.Schedule

export default connect(mapState, mapDispatch)(ContentSchedule)
