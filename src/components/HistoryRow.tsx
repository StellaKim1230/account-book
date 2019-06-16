import React, { FC } from 'react'

interface Props {
  title: string
  amount: number
  createdAt: string
}

const HistoryRow: FC<Props> = ({
  title,
  amount,
  createdAt,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{amount}</td>
      <td>{createdAt}</td>
    </tr>
  )
}

export default HistoryRow
