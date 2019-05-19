import React, { Component } from 'react'

import Sidebar from '../components/Sidebar'
import NavigationBar from '../components/NavigationBar'

import './SidebarTemplate.scss'

interface Props {}

class SiderbarTemplate extends Component<Props> {
  render() {
    return (
      <div className='SiderbarTemplate'>
        <div className='SiderbarTemplate__sidebar'>
          <Sidebar />
        </div>
        <div className='SiderbarTemplate__main'>
          <NavigationBar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default SiderbarTemplate
