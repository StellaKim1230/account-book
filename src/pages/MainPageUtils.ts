export const getAmountByCategoryLabels = (category: string) => {
  switch (category) {
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
    default:
      return category
  }
}
