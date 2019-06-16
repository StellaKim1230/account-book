import React, { FC, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'

import getErrorMessage from '../utils/errorMessage'
import { apiHandler } from '../utils/api'
import { SigninResult } from '../types/model'

import './SigninPage.scss'

const getStorage = (rememberUser: boolean) => (
  rememberUser ? localStorage : sessionStorage
)

const SigninPage: FC<RouteComponentProps> = ({ history }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ rememberUser, toggleSaveToken ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const { result, errorCode, data } = await apiHandler<SigninResult>(
        '/signin',
        'POST',
        JSON.stringify({
          email,
          password,
        })
      )

      if (!result) {
        setErrorMessage(getErrorMessage(errorCode))
        return
      }

      if (!data) {
        setErrorMessage('Response invalid')
        return
      }

      const { accessToken, refreshToken } = data

      const storage = getStorage(rememberUser)
      storage.setItem('accessToken', accessToken)
      storage.setItem('refreshToken', refreshToken)

      history.push('/')
    } catch (err) {
      // error handler
      console.error(err)
    }
  }

  return (
    <div className='SigninPage'>
      <header className='SigninPage__title'>
        로그인
      </header>
      <form className='SigninPage__form'>
        <Input
          className='SigninPage__input'
          name='email'
          type='text'
          placeholder='이메일 입력'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className='SigninPage__input'
          name='password'
          type='password'
          placeholder='패스워드 입력'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='SignupPage__checkbox'>
          <Checkbox
            id='saveId'
            htmlFor='saveId'
            checked={rememberUser}
            onChange={() => toggleSaveToken(!rememberUser)}
            label='아이디 저장하기'
          />
        </div>
        <Button
          className='SigninPage__button'
          disabled={!(email && password)}
          title='로그인'
          onClick={handleClick}
        />
      </form>
      {errorMessage && (
        <div className='SigninPage__apiErrorMessage'>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default withRouter(SigninPage)
