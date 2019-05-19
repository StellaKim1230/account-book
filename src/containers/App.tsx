import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainPage from '../pages/MainPage'
import SiderbarTemplate from '../templates/SiderbarTemplate'
import SignupPage from '../pages/SignupPage'

class App extends Component {
  render() {
    return (
      <Router>
        <SiderbarTemplate>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/signup' component={SignupPage} />
          </Switch>
        </SiderbarTemplate>
      </Router>
    )
  }
}

export default App
