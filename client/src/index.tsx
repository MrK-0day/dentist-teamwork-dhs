import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Import Config
import './config/configPage'

// Import Screen
import Router from './screens/Router'

// Import Store Rematch
import { store } from './modules/rematch/store'

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('root'))
