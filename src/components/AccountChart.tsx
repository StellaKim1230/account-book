import React, { Component, createRef } from 'react'

import { Chart, ChartConfiguration } from 'chart.js'

class AccountChart extends Component<ChartConfiguration> {
  canvas: React.RefObject<HTMLCanvasElement>

  constructor(props: ChartConfiguration) {
    super(props)

    this.canvas = createRef()
  }

  componentDidMount() {
    const {
      type,
      data,
      options,
    } = this.props

    const { current } = this.canvas

    const renderChart = new Chart(current!, {
      data,
      options,
      type,
    })
  }

  render() {
    return (
      <div className='AccountChart'>
        <canvas ref={this.canvas}></canvas>
      </div>
    )
  }
}

export default AccountChart
