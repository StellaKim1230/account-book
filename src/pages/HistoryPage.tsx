import React, { FC, useState, useEffect } from 'react'

import queryString from 'query-string'

import Table from '../components/Table'
import HistoryRow from '../components/HistoryRow'
import Select from '../components/Select'
import Button from '../components/Button'
import HistoryAdd from '../components/HistoryAdd'
import Modal from '../components/Modal'

import { History, Category, Account } from '../types/model'
import { getNameFromKey } from '../utils/misc'
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

const initialParamState = {
  account: '',
  category: '',
}

const HistoryPage: FC<Props> = () => {
  const [ history, setHistory ] = useState<History>()
  const [ accounts, setAccounts ] = useState<Account[]>()
  const [ categories, setCategories ] = useState<Category[]>()
  const [ params, setParams ] = useState(initialParamState)
  const [ isShowingModal, toggleShowingModal ] = useState(false)

  const fetchCategoryAndAccount = async () => {
    try {
      const [ account, category ] = await Promise.all([
        apiHandler<Account[]>('/accounts'),
        apiHandler<Category[]>('/categories'),
      ])

      if (!(account.result && category.result)) {
        console.error(account.errorCode)
        console.error(category.errorCode)
        return
      }

      setAccounts(account.data)
      setCategories(category.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCategoryAndAccount()
  }, [])

  const fetchHistory = async () => {
    try {
      const url = `/histories?${queryString.stringify(params)}`

      const { result, errorCode, data } = await apiHandler<History>(url)

      if (!result) {
        console.error(errorCode)
        return
      }

      setHistory(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [params])

  const handleSelect = async ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target

    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const getOptions = (options: Account[] | Category[], selector: string) => {
    const defaultOptions = [{
      value: '',
      label: '전체',
    }]

    if (options) {
      options.forEach((option: Account | Category) => {
        defaultOptions.push({
          value: option.id.toString(),
          label: getNameFromKey(option[selector] as string),
        })
      })
    }

    return defaultOptions
  }

  const getAccountOptions = getOptions(accounts!, 'accountName')
  const getCategoryOptions = getOptions(categories!, 'categoryName')

  return (
    <div className='HistoryPage'>
      <Modal
        header='가계부 추가'
        isShowing={isShowingModal}
        hideModal={() => toggleShowingModal(false)}
      >
        <HistoryAdd />
      </Modal>
      <Select
        className='HistoryPage__account'
        name='account'
        optionData={getAccountOptions}
        onChange={handleSelect}
      />
      <Select
        className='HistoryPage__category'
        name='category'
        optionData={getCategoryOptions}
        onChange={handleSelect}
      />
      {history && (
        <Table
          className='HistoryPage__table'
          headers={headers}
          rows={history.histories.map(
            (historyItem) => (
              <HistoryRow
                key={historyItem.id}
                title={historyItem.title}
                amount={historyItem.amount}
                account={historyItem.account}
                category={historyItem.category}
                createdAt={historyItem.createdAt}
                description={historyItem.description}
              />
          ))}
        />
      )}
      <Button
        className='HistoryPage__button'
        title='가계부 내역 추가'
        onClick={() => toggleShowingModal(!isShowingModal)}
      />
    </div>
  )
}

export default HistoryPage
