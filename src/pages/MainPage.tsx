import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootAction } from 'AppTypes'
import { map } from 'lodash'

import {
  currencyFormatFactory,
  dateFormatFactory
} from '../utils/formatUtils'
import {
  getAmountByCategoryLabels,
  getAmountPerRangeLabels,
} from './MainPageUtils'

import Chart from '../components/Chart'

import './MainPage.scss'

import { getMainStats as getMainStatsAction } from '../redux/actions/mainStats'

const currencyFomatter = currencyFormatFactory()
const dateFormatter = dateFormatFactory()

interface Props {
  isLoading: boolean,
  amountByCategory: AmountByCategory[],
  amountPerRange: AmountPerRange,
  balanceByAccount: BalanceByAccount[],
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
        <div className='MainPage__section'>
          <Chart
            className='MainPage__amountByCategoryChart'
            type='doughnut'
            title='분류별 지출 현황'
            chartData={map(amountByCategory, ({ total }) => (
              parseInt(total, 10)
            ))}
            labels={map(amountByCategory, ({ categoryName }) => (
              getAmountByCategoryLabels(categoryName)
            ))}
            responsive
            isLegendShowing
          />
          <ul className='MainPage__balanceByAccount'>
            {balanceByAccount.map(({ id, accountName, accountNumber, date, cardNumber, balance}) => (
              <li key={id}>
                <div>{accountName}: {accountNumber || cardNumber}</div>
                <div>{dateFormatter(date)} {date ? `기준` : ''} 잔액 : {currencyFomatter(balance || 0)}원</div>
              </li>
            ))}
          </ul>
        </div>
        <Chart
          className='MainPage__amountPerRangeChart'
          type='line'
          title='한달 지출 현황'
          chartData={balances.map((balance) => parseInt(balance, 10))}
          labels={getAmountPerRangeLabels(balances, 'day')}
          responsive
          isLegendShowing={false}
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
