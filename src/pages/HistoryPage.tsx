import React, { FC, useState, useEffect } from 'react'

import Table from '../components/Table'
import HistoryRow from '../components/HistoryRow'

import { History } from '../types/model'
import { apiHandler } from '../utils/api'

import './HistoryPage.scss'

const headers = [{
  headerClassName: 'HistoryPage__createdAtHeader', header: '사용날짜',
}, {
  headerClassName: 'HistoryPage__typeHeader', header: '종류',
}, {
  headerClassName: 'HistoryPage__categoryHeader', header: '카테고리',
}, {
  headerClassName: 'HistoryPage__accountHeader', header: '계좌명',
}, {
  headerClassName: 'HistoryPage__titleHeader', header: '제목',
}, {
  headerClassName: 'HistoryPage__amountHeader', header: '금액',
}, {
  headerClassName: 'HistoryPage__descriptionHeader', header: '설명',
}]

interface Props {}

const HistoryPage: FC<Props> = () => {
  const [ history, setHistory ] = useState<History>()

  useEffect(() => {
    apiHandler<History>('/histories')
      .then(({ result, errorCode, data }) => {
        if (!result) {
          console.error(errorCode)
          return
        }

        setHistory(data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <div className='HistoryPage'>
      {history && (
        <Table
          className='HistoryPage__table'
          headers={headers}
          rows={history.histories.map(
            ({
              id,
              title,
              amount,
              account,
              category,
              description,
              createdAt,
            }) => (
              <HistoryRow
                key={id}
                title={title}
                amount={amount}
                account={account}
                category={category}
                createdAt={createdAt}
                description={description}
              />
          ))}
        />
      )}
    </div>
  )
}

export default HistoryPage
