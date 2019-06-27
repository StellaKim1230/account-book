import React, { FC } from 'react'

import Button from './Button'

import './NavigationBar.scss'

interface Props {}

const NavigationBar: FC<Props> = () => (
  <div className='NavigationBar'>
    <div className='NavigationBar__link'>
      <Button
        to='/signin'
        className='small'
        title='로그인'
      />
      <Button
        to='/signup'
        className='small'
        title='회원가입'
      />
    </div>
    <div className='NavigationBar__content'>
      <Button
        to='/'
        title='가계부'
      />
      <Button
        to='/history'
        title='가계부 내역'
      />
    </div>
  </div>
)

export default NavigationBar
