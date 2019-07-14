import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootAction } from 'AppTypes'
import { sum, map, ary } from 'lodash'

import AmountByCategoryChart from '../components/AmountByCategoryChart'
import AmountPerRangeChart from '../components/AmountPerRangeChart'

import {
  currencyFormatFactory,
  dateFormatFactory
} from '../utils/formatUtils'

import { ReduxState } from '../types'
import {
  AmountByCategory,
  AmountPerRange,
  BalanceByAccount,
} from '../types/model'

import { getMainStats as getMainStatsAction } from '../redux/actions/mainStats'

import './MainPage.scss'

const currencyFomatter = currencyFormatFactory()
const dateFormatter = dateFormatFactory()

interface Props {
  isLoading: boolean
  amountByCategory: AmountByCategory[]
  amountPerRange: AmountPerRange
  balanceByAccount: BalanceByAccount[]
  getMainStats: () => (dispatch: Dispatch) => void
}

class MainPage extends Component<Props> {
  componentDidMount() {
    this.props.getMainStats()
  }

  render() {
    const {
      isLoading,
      amountByCategory,
      amountPerRange,
      balanceByAccount,
    } = this.props

    const isValidData = amountByCategory && amountPerRange && balanceByAccount

    const  { balances } = amountPerRange

    return !isLoading && isValidData && (
      <div className='MainPage'>
        <div className='MainPage__currentMonth'>
          <div className='MainPage__currentMonthTitle'>
            <span className='MainPage__currentDate'>
              {dateFormatter(Date.now())}
            </span> 까지 사용한 금액
          </div>
          <div className='MainPage__totalExpenseByCurrentMonth'>
            {currencyFomatter(sum(map(amountPerRange.balances, ary(parseInt, 1))))}원
          </div>
        </div>
        <div className='MainPage__balanceByAccount'>
          {balanceByAccount.map(({ id, accountName, accountNumber, cardNumber, balance}) => (
            <div key={id} className='MainPage__balanceByAccountTable'>
              <div className='MainPage__balanceByAccountHead'>
                {accountName}: {accountNumber || cardNumber}
              </div>
              <div className='MainPage__balanceByAccountValue'> 잔액 : {currencyFomatter(balance || 0)}원</div>
            </div>
          ))}
        </div>
        <AmountByCategoryChart
          amountByCategory={amountByCategory}
        />
        <AmountPerRangeChart
          balances={balances}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ mainStats }: ReduxState) => ({
  isLoading: mainStats.isLoading,
  amountByCategory: mainStats.amountByCategory,
  amountPerRange: mainStats.amountPerRange,
  balanceByAccount: mainStats.balanceByAccount,
})

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getMainStats: getMainStatsAction,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
