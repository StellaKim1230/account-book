import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import Input from '../components/Input'
import InputWithError from '../components/InputWithError'

import ErrorMessage from '../constants/errorMessage'
import { emailCheck, passwordCheck } from './SignupPageUtils'
import { apiHandler } from '../utils/api'

import './SignupPage.scss'

interface State {
  [key: string]: boolean | string
  email: string
  password: string
  passwordConfirm: string
  isValidEmail: boolean
  isValidPassword: boolean
  emailTouched: boolean
  passwordTouched: boolean
  isAgreementSelector: boolean
}

class SignupPage extends Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      isValidEmail: false,
      isValidPassword: false,
      emailTouched: false,
      passwordTouched: false,
      isAgreementSelector: false,
    }
  }

  handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      [`${target.name}Touched`]: true,
    })
  }

  handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isValidEmail: emailCheck(this.state.email),
        isValidPassword: passwordCheck(this.state.password),
      })
    })
  }

  handleCheck = () => {
    this.setState({
      isAgreementSelector: !this.state.isAgreementSelector,
    })
  }

  handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { email, password } = this.state

    try {
      const { data, result } = await apiHandler('/signup', 'POST', JSON.stringify({ email, password })) as ApiResponse
      const { accessToken, refreshToken } = data

      if (result) {
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('accessToken', accessToken)
        sessionStorage.setItem('refreshToken', refreshToken)
      }

      this.props.history.push('/')

    } catch (err) {
      // add error handler
      console.error(err)
    }
  }

  isDisabledButton = () => {
    const {
      email,
      password,
      passwordConfirm,
      isValidEmail,
      isValidPassword,
      isAgreementSelector,
    } = this.state

    if (!(email && password && passwordConfirm) && !isAgreementSelector) return true
    if ((password !== passwordConfirm) && !isAgreementSelector) return true
    if (!(isValidEmail && isValidPassword && isAgreementSelector)) return true
    return false
  }

  getPasswordErrorMessage = () => {
    const {
      passwordTouched,
      isValidPassword,
    } = this.state

    if (passwordTouched && !isValidPassword) return ErrorMessage.INVALID_PASSWORD_FORMAT

    return ''
  }

  getEmailErrorMessage = () => {
    const {
      emailTouched,
      isValidEmail,
    } = this.state

    if (emailTouched && !isValidEmail) return ErrorMessage.INVALID_EMAIL_FORMAT

    return ''
  }

  render() {
    const {
      handleChange,
      handleBlur,
      handleCheck,
      handleClick,
      isDisabledButton,
      getEmailErrorMessage,
      getPasswordErrorMessage,
    } = this

    return (
      <div className='SignupPage'>
        <header className='SignupPage__title'>
          회원 가입
        </header>
        <form className='SignupPage__form'>
          <InputWithError
            className='SignupPage__input'
            name='email'
            type='text'
            placeholder='이메일 입력'
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={getEmailErrorMessage()}
          />
          <InputWithError
            className='SignupPage__input'
            name='password'
            type='password'
            placeholder='패스워드 입력'
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={getPasswordErrorMessage()}
          />
          <Input
            className='SignupPage__input'
            name='passwordConfirm'
            type='password'
            placeholder='패스워드 확인'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className='SignupPage__checkbox'>
            <Checkbox
              id='agreement'
              htmlFor='agreement'
              checked={this.state.isAgreementSelector}
              onChange={handleCheck}
              label='동의합니다.'
            />
          </div>
          <Button
            className='SignupPage__button'
            disabled={isDisabledButton()}
            title='회원 가입'
            onClick={handleClick}
          />
        </form>
      </div>
    )
  }
}

export default withRouter(SignupPage)
