import React, { FC, ReactNode } from 'react'

interface Props {
  headers: string[]
  rows: ReactNode[]
}

const Table: FC<Props> = ({
  headers,
  rows,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => row)}
      </tbody>
    </table>
  )
}

export default Table
