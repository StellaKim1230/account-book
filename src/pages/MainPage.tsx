import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootAction } from 'AppTypes'
import { map } from 'lodash'

import Chart from '../components/Chart'
import {
  getAmountByCategoryLabels,
  getAmountPerRangeLabels,
} from './MainPageUtils'
import { getMainStats as getMainStatsAction } from '../redux/actions/mainStats'

import './MainPage.scss'

interface Props {
  isLoading: boolean
  amountByCategory: AmountByCategory[]
  amountPerRange: AmountPerRange
  getMainStats: () => (dispatch: Dispatch) => void
}

class MainPage extends Component<Props> {
  componentDidMount() {
    this.props.getMainStats()
  }

  render() {
    const { isLoading, amountByCategory, amountPerRange } = this.props
    const isValidData = amountByCategory && amountPerRange

    const  { balances } = amountPerRange

    return !isLoading && isValidData && (
      <div className='MainPage'>
        <header className='MainPage__header'>메인페이지</header>
        <div className='MainPage__amountByCategory'>
          <Chart
            className='MainPage__chart'
            type='doughnut'
            title='분류별 지출 현황'
            chartData={map(amountByCategory, (amount) => (
              parseInt(amount.total, 10)
            ))}
            labels={map(amountByCategory, (amount) => (
              getAmountByCategoryLabels(amount.categoryName)
            ))}
            responsive
            isLegendShowing
          />
        </div>
        <div className='MainPage__amountPerRange'>
          <Chart
            className='MainPage__chart'
            type='line'
            title='한달 지출 현황'
            chartData={balances.map((balance) => parseInt(balance, 10))}
            labels={getAmountPerRangeLabels(balances, 'day')}
            responsive
            isLegendShowing={false}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ mainStats }: ReduxState) => ({
  isLoading: mainStats.isLoading,
  amountByCategory: mainStats.amountByCategory,
  amountPerRange: mainStats.amountPerRange,
})

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getMainStats: getMainStatsAction,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
