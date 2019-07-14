export const getNameFromKey = (key: string) => {
  switch (key) {
    case 'salary':
      return '급여'
    case 'incomeEtc':
      return '기타수입'
    case 'fixedCost':
      return '고정지출'
    case 'loanRepayment':
      return '대출상환'
    case 'travelSavings':
      return '여행적금'
    case 'transfer':
      return '이체'
    case 'congratulatoryMoney':
      return '경조비'
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
      return '적금'
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
