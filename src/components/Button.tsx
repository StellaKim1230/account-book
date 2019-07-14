import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import './Button.scss'

interface Props {
  className?: string
  state?: string
  title: string
  name?: string
  disabled?: boolean
  to?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<Props> = ({
  className,
  state,
  title,
  name,
  onClick,
  disabled,
  to,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={cx('Button', `${state ? `Button--${state}` : ''}`, className)}
      >
        {title}
      </Link>
    )
  }

  return (
    <button
      name={name}
      className={cx('Button', `${state ? `Button--${state}` : ''}`, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button
