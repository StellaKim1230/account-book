import numeral from 'numeral'
import { format } from 'date-fns'

export const currencyFormatFactory = (formatString: string = '0,0') => (currency: number | string) => {
  if (!currency) return 0

  return numeral(currency).format(formatString)
}

export const dateFormatFactory = (formatDate: string = 'YYYY-MM-DD') => (date: string | number | Date) => {
  if (!date) return ''

  return format(date, formatDate)
}
