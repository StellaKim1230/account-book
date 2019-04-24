export const getAmountByCategoryLabels = (category: string) => {
  switch (category) {
    case 'foodExpenses':
      return '식료품비'
    case 'livingExpenses':
      return '생활비'
    default:
      return category
  }
}

export const getAmountPerRangeLabels = (balances: string[], groupBy: string) => (
  groupBy === 'day' ? balances.map((b, i) => `${i + 1}일`) : balances.map((b, i) => `${i + 1}주`)
)
