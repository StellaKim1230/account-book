import React, { Component, createRef } from 'react'

import { Chart as ChartJs } from 'chart.js'
import cx from 'classnames'

import {
  getChartData,
  getChartOptions,
} from './ChartUtils'

interface Props {
  className?: string
  type: string
  title: string
  chartData: number[]
  labels: string[]
  responsive?: boolean
  isLegendShowing: boolean
  maintainAspectRatio?: boolean
}

class Chart extends Component<Props> {
  canvas: React.RefObject<HTMLCanvasElement>

  constructor(props: Props) {
    super(props)

    this.canvas = createRef()
  }

  componentDidMount() {
    const {
      type,
      title,
      chartData,
      labels,
      responsive,
      isLegendShowing,
    } = this.props

    const { current } = this.canvas

    const renderChart = new ChartJs(current!, {
      data: getChartData({
        type,
        labels,
        data: chartData,
      }),
      options: getChartOptions({
        responsive: ((typeof responsive === 'undefined') || responsive === false) ? false : true,
        maintainAspectRatio: false,
        text: title,
        isLegendShowing,
      }),
      type,
    })
  }

  render() {
    return (
      <div className={cx('Chart', this.props.className)}>
        <canvas ref={this.canvas} />
      </div>
    )
  }
}

export default Chart
