import React, { Component, Fragment } from 'react'

import AccountHome from '../components/AccountHome'

interface Props {}

class MainPage extends Component<Props> {
  render() {
    return (
      <div className="MainPage">
        메인페이지
        <AccountHome />
      </div>
    )
  }
}

export default MainPage
