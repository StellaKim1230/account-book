import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import MainPage from '../pages/MainPage'
import SiderbarTemplate from '../templates/SiderbarTemplate'

class App extends Component {
  render() {
    return (
      <SiderbarTemplate>
        <Router>
          <Route exact path='/' component={MainPage} />
        </Router>
      </SiderbarTemplate>
    )
  }
}

export default App
