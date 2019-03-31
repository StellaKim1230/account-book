import React, { Component, Fragment } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import SiderbarTemplate from '../templates/SiderbarTemplate'
import MainPage from '../pages/MainPage'

class App extends Component {
  render() {
    return (
      <Fragment>
        <SiderbarTemplate>
          <BrowserRouter>
            <Route exact path='/' component={MainPage} />
          </BrowserRouter>
        </SiderbarTemplate>
      </Fragment>
    )
  }
}

export default App
