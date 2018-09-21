import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Import Css
import 'antd/dist/antd.min.css'
import '../css/animate.min.css'
import '../css/theme.css'

// Import Screen
import Home from './home/Home'

class Router extends React.Component<any, any> {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
