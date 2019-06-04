import React, { FC, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import InputWithError from '../components/InputWithError'

import { emailCheck, passwordCheck } from './SignupPageUtils'
import { apiHandler } from '../utils/api'
import getErrorMessage from '../utils/errorMessage'
import useValidator from '../hooks/useValidator'

import './SignupPage.scss'

const SignupPage: FC<RouteComponentProps> = ({ history }) => {
  const emailInfo = useValidator('', emailCheck)
  const passwordInfo = useValidator('', passwordCheck)
  const passwordConfirmInfo = useValidator('', null)
  const [ isAgreement, toggleAgreement ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')

  const disabledButton = !(emailInfo.isError && passwordInfo.isError && passwordConfirmInfo.isError) && isAgreement

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const {
        data,
        result,
        errorCode,
      } = await apiHandler('/signup', 'POST', JSON.stringify({
        email: emailInfo.value,
        password: passwordInfo.value,
      })) as ApiResponse

      if (result === false) {
        setErrorMessage(getErrorMessage(errorCode))
        return
      }

      const { accessToken, refreshToken } = data
      sessionStorage.setItem('accessToken', accessToken)
      sessionStorage.setItem('refreshToken', refreshToken)

      history.push('/')

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='SignupPage'>
      <header className='SignupPage__title'>
        회원 가입
      </header>
      <form className='SignupPage__form'>
        <InputWithError
          inputRef={emailInfo.inputEl}
          className='SignupPage__input'
          name='email'
          type='text'
          placeholder='이메일 입력'
          onChange={(e) => emailInfo.setValue(e.target.value)}
          errorMessage={emailInfo.isError ? '올바른 이메일 형식이 아닙니다.' : ''}
        />
        <InputWithError
          inputRef={passwordInfo.inputEl}
          className='SignupPage__input'
          name='password'
          type='password'
          placeholder='패스워드 입력'
          onChange={(e) => passwordInfo.setValue(e.target.value)}
          errorMessage={passwordInfo.isError ? '올바른 비밀번호 형식이 아닙니다.' : ''}
        />
        <InputWithError
          inputRef={passwordConfirmInfo.inputEl}
          className='SignupPage__input'
          name='passwordConfirm'
          type='password'
          placeholder='패스워드 확인'
          onChange={(e) => passwordConfirmInfo.setValue(e.target.value)}
          errorMessage={passwordConfirmInfo.value !== passwordInfo.value ? '입력하신 비밀번호가 일치하지 않습니다.' : ''}
        />
        <div className='SignupPage__checkbox'>
          <Checkbox
            id='agreement'
            htmlFor='agreement'
            checked={isAgreement}
            onChange={() => toggleAgreement(!isAgreement)}
            label='동의합니다.'
          />
        </div>
        <Button
          className='SignupPage__button'
          disabled={!disabledButton}
          title='회원 가입'
          onClick={handleClick}
        />
      </form>
      {errorMessage && (
        <div className='SignupPage__apiErrorMessage'>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default withRouter(SignupPage)
