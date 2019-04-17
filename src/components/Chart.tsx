import React, { Component, createRef } from 'react'

import { Chart as ChartJs, ChartConfiguration } from 'chart.js'
import cx from 'classnames'

interface ComponentProps {
  className?: string,
}

type Props = ComponentProps & ChartConfiguration

class Chart extends Component<Props> {
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

    const renderChart = new ChartJs(current!, {
      data,
      options,
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
