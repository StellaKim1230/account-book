import React, { FC } from 'react'

import cx from 'classnames'

import './Checkbox.scss'

interface Props {
  className?: string
  id: string
  name?: string
  checked: boolean
  htmlFor: string
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<Props> = ({
  className,
  id,
  name,
  checked,
  htmlFor,
  label,
  onChange,
}) => (
  <>
    <input
      className={cx('Select', className)}
      type='checkbox'
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={htmlFor}>{label}</label>
  </>
)

export default Checkbox
