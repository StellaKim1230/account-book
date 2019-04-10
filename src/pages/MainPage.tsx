import React, { Component } from 'react'

import AccountMain from '../components/AccountMain'

interface Props {}

class MainPage extends Component<Props> {
  render() {
    return (
      <div className='MainPage'>
        <header>메인페이지</header>
        <AccountMain />
      </div>
    )
  }
}

export default MainPage
