import React, { Component } from 'react'

import Chart from './Chart'

interface Props {}

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

class Main extends Component<Props> {
  render() {
    return (
      <div className='Main'>
        <header>가계부 내용</header>
        <Chart
          type='pie'
          data={chartData}
          options={options}
        />
      </div>
    )
  }
}

export default Main
