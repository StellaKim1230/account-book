import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

const links = [{
  to: '/', label: '가계부',
}, {
  to: '/signin', label: '로그인',
}, {
  to: '/signup', label: '회원가입',
}, {
  to: '/history', label: '가계부 내역',
}]

interface Props {}

const Sidebar: FC<Props> = () => (
  <div className='Sidebar'>
    {links.map(({ to, label }) => (
      <Link
        key={to}
        className='Sidebar__title'
        to={to}
      >
        {label}
      </Link>
    ))}
  </div>
)

export default Sidebar
