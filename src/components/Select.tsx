import React, { FC } from 'react'

import cx from 'classnames'

import './Select.scss'

interface Props {
  className?: string
  name: string
  optionData: Array<{
    value: number
    label: string
  }>
  selectedValue?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<Props> = ({
  className,
  name,
  selectedValue,
  optionData,
  onChange,
}) => (
  <select
    className={cx('Select', className)}
    name={name}
    onChange={onChange}
    value={selectedValue}
  >
    {optionData.map(({ value, label }) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
)

export default Select
