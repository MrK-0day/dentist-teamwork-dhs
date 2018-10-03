import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Import Css
import 'antd/dist/antd.min.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../css/animate.min.css'
import '../css/theme.css'

// Import Screen
import Home from './home/Home'
import Login from './login/Login'

class Router extends React.Component<any, any> {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => {
            // let token = localStorage.getItem('TOKEN') === null
            // if (token) return <Login />
            // else return <Home />
            return <Home />
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
