import React, { FC, Fragment } from 'react'

import cx from 'classnames'

import Input from './Input'

import './InputWithError.scss'

interface Props {
  className?: string
  id?: string
  name: string
  type: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  errorMessage?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

const InputWithError: FC<Props> = ({
  className,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  errorMessage,
  inputRef,
}) => (
  <Fragment>
    <Input
      inputRef={inputRef}
      className={cx('InputWithError', className)}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
    {errorMessage && (
      <p className='InputWithError__message'>
        {errorMessage}
      </p>
    )}
  </Fragment>
)

export default InputWithError
