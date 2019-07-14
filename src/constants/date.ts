import { getYear, getMonth } from 'date-fns'

export const MONTH = [
  { value: 1, label: '1월' },
  { value: 2, label: '2월' },
  { value: 3, label: '3월' },
  { value: 4, label: '4월' },
  { value: 5, label: '5월' },
  { value: 6, label: '6월' },
  { value: 7, label: '7월' },
  { value: 8, label: '8월' },
  { value: 9, label: '9월' },
  { value: 10, label: '10월' },
  { value: 11, label: '11월' },
  { value: 12, label: '12월' },
]

export const START_YEAR = 2019

const currentTime = Date.now()

export const CURRENT_MONTH = (getMonth(currentTime) + 1).toString()

export const CURRENT_YEAR = getYear(currentTime)
