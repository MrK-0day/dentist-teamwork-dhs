import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { LoginForm } from '../../components/form/LoginForm'

class Login extends React.Component<any, any> {
  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '90vh' }}>
        <div style={{ display: 'flex', minWidth: '15%' }}>
          <LoginForm props={this.props} />
        </div>
      </div>
    )
  }
}

const mapState = (state: any) => state.Login

const mapDispatch = (dispatch: any) => dispatch.Login

export default connect(mapState, mapDispatch)(withRouter(Login))
