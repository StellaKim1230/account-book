import React, { Component } from 'react'
import { map } from 'lodash'
import { take } from 'lodash'

import Button from './Button'
import Select from './Select'
import Chart from './Chart'

import { getAmountByCategoryLabels } from '../pages/MainPageUtils'
import { apiHandler } from '../utils/api'

import { MONTH, START_YEAR, CURRENT_MONTH, CURRENT_YEAR } from '../constants/date'

interface Props {
  className?: string
  amountByCategory: AmountByCategory[]
}

interface State {
  [key: string]: boolean | AmountByCategory[] | string
  isShowingMonthSelector: boolean
  amountByCategory: AmountByCategory[]
  year: string
  month: string
}

const getYears = (() => {
  const range = CURRENT_YEAR - START_YEAR
  const years = [{
    value: START_YEAR,
    label: START_YEAR.toString(),
  }]

  for (let i = 1; i <= range; i ++) {
    years.push({
      value: START_YEAR + i,
      label: (START_YEAR + i).toString(),
    })
  }

  return years
})()

class AmountByCategoryChart extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isShowingMonthSelector: false,
      amountByCategory: props.amountByCategory,
      year: START_YEAR.toString(),
      month: CURRENT_MONTH,
    }
  }

  getAmount = async (url: string) => {
    try {
      const { data } = await apiHandler(url) as ApiResponse
      this.setState({
        amountByCategory: data,
      })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target

    this.setState({
      [name]: value,
    }, () => {
      const { month, year } = this.state
      this.getAmount(`/amount/1?year=${year}&month=${month}`)
    })
  }

  toggleMonthSelector = () => {
    const { year, month } = this.state

    this.setState({
      isShowingMonthSelector: !this.state.isShowingMonthSelector,
    }, () => {
      this.getAmount(`/amount/1?year=${year}&month=${month}`)
    })
  }

  render() {
    const {
      isShowingMonthSelector,
      amountByCategory,
      year,
      month,
    } = this.state

    return (
      <div className='MainPage__amountByCategoryChartWrapper'>
        <div className='MainPage__amountByCategoryChartDate'>
          {year}년 {month}월
        </div>
        <div className='MainPage__amountByCategoryChartFilter'>
          <Select
            className='Select__year'
            name='year'
            optionData={getYears}
            selectedValue={year}
            onChange={this.handleChange}
          />
          {isShowingMonthSelector && <Select
            className='Select__month'
            name='month'
            optionData={take(MONTH, parseInt(CURRENT_MONTH, 10))}
            selectedValue={month}
            onChange={this.handleChange}
          />}
          <Button
            // name={isShowingMonthSelector ? 'year' : 'year & month'}
            title={isShowingMonthSelector ? 'year' : 'year & month'}
            onClick={this.toggleMonthSelector}
          />
        </div>
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
      </div>
    )
  }
}

export default AmountByCategoryChart
