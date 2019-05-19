import React, { FC } from 'react'

import cx from 'classnames'

import './Input.scss'

interface Props {
  className?: string
  id?: string
  name: string
  type: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = ({
  className,
  id,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
}) => (
  <input
    className={cx('Input', className)}
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
  />
)

export default Input
