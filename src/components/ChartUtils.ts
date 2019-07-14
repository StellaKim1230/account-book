import { ChartTooltipItem } from 'chart.js'
import { take , random } from 'lodash'

import { currencyFormatFactory } from '../utils/formatUtils'

const fomatter = currencyFormatFactory()

interface ChartDataParams {
  label?: string
  type: string
  labels: string[]
  data: number[]
  borderWidth?: number
}

interface ChartOptionsParams {
  text: string
  responsive: boolean
  isLegendShowing: boolean
  maintainAspectRatio: boolean
}

interface AddChartDataParmas {
  chart: Chart
  labels: string[]
  chartData: number[]
  type: string
}

const numberToHex = (n: number) => (
  (n).toString(16).toUpperCase()
)

const getHexString = ({r, g, b}: {[key: string]: number}) => (
  `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`
)

const getColorVector = (data: number[]) => (
  data.map(() => (
    getHexString({
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    })
  ))
)

const getColors = (type: string, data: number[]) => {
  switch (type) {
    case 'doughnut':
      return getColorVector(data)
    case 'line':
      return getColorVector(take(data))
    default:
      return ['#FFFFFF']
  }
}

export const getChartData = ({
  type,
  data,
  label,
  labels,
  borderWidth,
}: ChartDataParams) => {
  const colorVector = getColors(type, data)
  return {
    datasets: [{
      data,
      label,
      backgroundColor: colorVector,
      borderColor: colorVector,
      borderWidth: !borderWidth ? 1 : borderWidth,
    }],
    labels,
  }
}

export const getChartOptions = ({
  text,
  responsive,
  isLegendShowing,
  maintainAspectRatio,
}: ChartOptionsParams) => ({
  responsive,
  maintainAspectRatio,
  title: {
    text,
    display: true,
  },
  legend: {
    display: isLegendShowing,
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem: ChartTooltipItem) => (
        `₩${fomatter(tooltipItem.yLabel || '')}원`
      ),
    },
  },
})

export const removeChartData = (chart: Chart) => {
  chart.data!.datasets! = []
  chart.data!.labels! = []

  chart.update()
}

export const addChartData = ({
  chart,
  labels,
  chartData,
  type,
}: AddChartDataParmas) => {
  chart.data = getChartData({
    type,
    labels,
    data: chartData,
  })

  chart.update()
}
