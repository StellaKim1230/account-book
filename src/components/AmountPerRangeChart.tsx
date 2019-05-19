import React, { Component } from 'react'
import { getYear, getMonth } from 'date-fns'

import Button from './Button'
import Chart from './Chart'

import { getAmountPerRangeLabels } from '../pages/MainPageUtils'
import { apiHandler } from '../utils/api'

interface Props {
  balances: string[]
}

interface State {
  balances: string[]
  isShowingDaySelector: boolean
  dayButtonState: string
  weekButtonState: string
}

class AmountPerRangeChart extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      balances: props.balances,
      isShowingDaySelector: true,
      dayButtonState: 'selected',
      weekButtonState: '',
    }
  }

  getAmount = async (url: string) => {
    try {
      const { data } = await apiHandler(url) as ApiResponse
      this.setState({
        balances: data.balances,
      })
    } catch (err) {
      // add error handler
      console.error(err)
    }
  }

  buttonClickCallback = () => {
    this.state.isShowingDaySelector ? this.getAmount('/amount/2') : this.getAmount('/amount/2?filter=week')
  }

  handleButtonClick = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = target as HTMLButtonElement

    this.setState({
      isShowingDaySelector: name === 'day' ? true : false,
      dayButtonState: name === 'day' ? 'selected' : '',
      weekButtonState: name === 'week' ? 'selected' : '',
    }, this.buttonClickCallback)
  }

  render() {
    const {
      balances,
      isShowingDaySelector,
      dayButtonState,
      weekButtonState,
    } = this.state

    const currentYear = getYear(Date.now())
    const currentMonth = (getMonth(Date.now()) + 1).toString()

    return (
      <div className='MainPage__amountPerRangeWrapper'>
        <div className='MainPage__amountPerRangeChartDate'>
          {currentYear}년 {currentMonth}월
        </div>
        <div className='MainPage__amountPerRangeFilter'>
          <Button
            state={dayButtonState}
            title='DAY'
            onClick={this.handleButtonClick}
          />
          <Button
            state={weekButtonState}
            title='WEEK'
            onClick={this.handleButtonClick}
          />
        </div>
        <Chart
          className='MainPage__amountPerRangeChart'
          type='line'
          title='한달 지출 현황'
          chartData={balances.map((balance) => parseInt(balance, 10))}
          labels={getAmountPerRangeLabels(balances, isShowingDaySelector ? 'day' : 'week')}
          responsive
          isLegendShowing={false}
        />
      </div>
    )
  }
}

export default AmountPerRangeChart
