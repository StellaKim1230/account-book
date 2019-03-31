import React, { Component } from 'react'

import Sidebar from '../components/Sidebar'

import './SidebarTemplate.scss'

class SiderbarTemplate extends Component {
  render() {
    const { children } = this.props
    return (
      <div className='SiderbarTemplate'>
        <div className='SiderbarTemplate__sidebar'>
          <Sidebar />
        </div>
        <div className='SiderbarTemplate__main'>
          {children}
        </div>
      </div>
    )
  }
}

export default SiderbarTemplate
