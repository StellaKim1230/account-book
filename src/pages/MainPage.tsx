import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootAction } from 'AppTypes'

import Chart from '../components/Chart'
import { getMainStats as getMainStatsAction } from '../redux/actions/mainStats'

import './MainPage.scss'

interface Props {
  isLoading: boolean,
  amountByCategory: AmountByCategory[],
  amountPerRange: AmountPerRange,
  getMainStats: () => (dispatch: Dispatch) => void
}

const chartData = {
  datasets: [{
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
    ],
    borderWidth: 1,
    data: [10000, 24000, 300000],
    label: '# of Votes',
  }],
  labels: ['1월', '2월', '3월'],
}

const options = {
  responsive: true,
  scales: {
    yAxes: [{
      stacked: false,
    }],
  },
}

class MainPage extends Component<Props> {
  componentDidMount() {
    this.props.getMainStats()
  }

  render() {
    const { isLoading, amountByCategory, amountPerRange } = this.props
    const isValidData = amountByCategory && amountPerRange

    return !isLoading && isValidData && (
      <div className='MainPage'>
        <header className='MainPage__header'>메인페이지</header>
        <div className='MainPage__amountByCategory'>
          <Chart
            type='pie'
            className='MainPage__chart'
            data={chartData}
            options={options}
          />
        </div>
        <div className='MainPage__amountPerRange'>
          <Chart
            type='pie'
            className='MainPage__chart'
            data={chartData}
            options={options}
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
