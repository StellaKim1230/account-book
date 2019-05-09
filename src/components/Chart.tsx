import React, { Component, createRef } from 'react'

import { Chart } from 'chart.js'
import cx from 'classnames'

import {
  getChartData,
  getChartOptions,
  removeChartData,
  addChartData
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

class ReactChart extends Component<Props> {
  canvas: React.RefObject<HTMLCanvasElement>
  chart: Chart

  constructor(props: Props) {
    super(props)

    this.canvas = createRef()
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.chartData !== this.props.chartData) {
      const { labels, chartData } = this.props
      this.updateChart(labels, chartData)
    }
  }

  renderChart = () => {
    const {
      type,
      title,
      chartData,
      labels,
      responsive,
      isLegendShowing,
    } = this.props

    const { current } = this.canvas

    this.chart = new Chart(current!, {
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

  updateChart = (labels: string[], chartData: number[]) => {
    removeChartData(this.chart)
    addChartData({
      chart: this.chart,
      labels,
      chartData,
      type: this.props.type,
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

export default ReactChart
