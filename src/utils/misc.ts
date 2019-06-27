export const getNameFromKey = (key: string) => {
  switch (key) {
    case 'foodExpenses':
      return '식료품비'
    case 'livingExpenses':
      return '생활비'
    case 'pension':
      return '연금'
    case 'apartmentApplicationDeposit':
      return '주택청약'
    case 'loanInterest':
      return '대출이자'
    case 'principalOfLoan':
      return '대출원금'
    case 'installmentSavings':
      return '할부'
    case 'saving':
      return '적금'
    case 'output':
      return '지출'
    case 'income':
      return '수입'
    default:
      return key
  }
}
