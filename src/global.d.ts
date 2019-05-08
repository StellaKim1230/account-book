// Decalre global typescript types.

declare var DEV: boolean

interface ReduxAction {
  type: string
  payload?: any
}

interface AmountByCategory {
  total: string
  categoryName: string
}

interface AmountPerRange {
  month: string
  groupBy: string
  balances: string[]
}

interface BalanceByAccount {
  id: number
  accountName: string
  accountNumber: string | null
  balance: number | null
  date: string
  cardNumber: string | null
}

interface MainStatsReducer {
  amountByCategory: AmountByCategory[]
  amountPerRange: AmountPerRange
  balanceByAccount: BalanceByAccount[]
  isLoading: boolean
}

interface ReduxState {
  mainStats: MainStatsReducer
}

interface ApiResponse {
  result: boolean
  data?: any
  errorCode?: number
  balances?: any
}
