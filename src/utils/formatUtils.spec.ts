import { currencyFormatFactory } from './formatUtils'

describe('currencyFormatFactory', () => {
  test('should return true when currency format', () => {
    expect(currencyFormatFactory()('30000')).toBe('30,000')
  })
})
