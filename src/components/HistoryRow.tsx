import React, { FC } from 'react'

import { dateFormatFactory, currencyFormatFactory } from '../utils/formatUtils'
import { getNameFromKey } from '../utils/misc'

import { Account, Category } from '../types/model'

import './HistoryRow.scss'

const dateFormatter = dateFormatFactory()
const fomatter = currencyFormatFactory()

interface Props {
  key: number
  title: string
  amount: number
  account: Pick<Account, 'accountName'>
  category: Pick<Category, 'type' | 'categoryName'>
  description?: string
  createdAt: Date
}

const HistoryRow: FC<Props> = ({
  title,
  amount,
  account,
  category,
  description,
  createdAt,
}) => {
  return (
    <tr className={'HistoryRow'}>
      <td className={'HistoryRow__createdAt'}>
        {dateFormatter(createdAt)}
      </td>
      <td className={'HistoryRow__type'}>
        {category && getNameFromKey(category.type.title)}
      </td>
      <td className={'HistoryRow__category'}>
        {category && getNameFromKey(category.categoryName)}
      </td>
      <td className={'HistoryRow__accountName'}>
        {account.accountName}
      </td>
      <td className={'HistoryRow__title'}>
        {title}
      </td>
      <td className={'HistoryRow__amount'}>
        {fomatter(amount || '')}원
      </td>
      <td className={'HistoryRow__description'}>
        {description}
      </td>
    </tr>
  )
}

export default HistoryRow
