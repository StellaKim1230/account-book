import numeral from 'numeral'

export const currencyFormatFactory = (formatString: string = '0,0') => (currency: number | string) => {
  if (!currency) return ''

  return numeral(currency).format(formatString)
}
