import React, { FC, ReactNode } from 'react'

import cx from 'classnames'

import { TableHeader } from '../types/model'

import './Table.scss'

interface Props {
  className?: string
  headers: TableHeader[]
  rows: ReactNode[]
}

const Table: FC<Props> = ({
  className,
  headers,
  rows,
}) => {
  return (
    <table className={cx('Table', className)}>
      <thead className={cx('Table__thead', className)}>
        <tr className='Table__tr'>
          {headers.map(({ headerClassName, header }) => (
            <th
              className={cx('Table__th', headerClassName)}
              key={headerClassName}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={`Table__tbody ${className}`}>
        {rows}
      </tbody>
    </table>
  )
}

export default Table
