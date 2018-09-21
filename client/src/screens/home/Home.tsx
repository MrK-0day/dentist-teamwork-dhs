import * as React from 'react'
import { connect } from 'react-redux'

import { SiderNav } from '../../components/sidenav/SiderNav'

class Home extends React.Component<any, any> {
  componentWillMount () {
    this.props.setState('isSelectMenuItem', 'quanlybenhnhan')
  }
  render () {
    return (
      <div>
        <SiderNav props={this.props} />
      </div>
    )
  }
}

const mapState = (state: any) => state.Home

const mapDispatch = (dispatch: any) => dispatch.Home

export default connect(mapState, mapDispatch)(Home)
