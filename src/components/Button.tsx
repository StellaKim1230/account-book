import React, { Component } from 'react'
import cx from 'classnames'

import './Button.scss'

interface Props {
  className?: string
  state?: string
  title: string
  name: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

class Button extends Component<Props> {
  render() {
    const {
      className,
      state,
      title,
      name,
      onClick,
    } = this.props

    return (
      <button
        name={name}
        className={cx('Button', `${state ? `Button--${state}` : ''}`, className)}
        onClick={onClick}
      >
        {title}
      </button>
    )
  }
}

export default Button
