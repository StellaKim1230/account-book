import React, { FC, useState, useEffect } from 'react'

import Table from '../components/Table'
import HistoryRow from '../components/HistoryRow'

import { History } from '../types/model'
import { apiHandler } from '../utils/api'

const headers = ['사용날짜', '종류', '카테고리', '계좌명', '제목', '금액', '설명']

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
      {history && (<Table
        headers={headers}
        rows={history.histories.map(({ id, title, amount, createdAt}) => (
          <HistoryRow
            key={id}
            title={title}
            amount={amount}
            createdAt={createdAt}
          />
        ))}
      />)}
    </div>
  )
}

export default HistoryPage
