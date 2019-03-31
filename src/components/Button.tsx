import * as React from 'react'
import { Component, Fragment } from 'react'

interface ButtonProps {
  name: string,
  title: string,
}

class Button extends Component<ButtonProps> {
  render () {
    const { name, title } = this.props
    return (
      <Fragment>
        <button name={name}>{title}</button>
      </Fragment>
    )
  }
}

export default Button
