export interface History {
  count: number
  histories: HistoryItem[]
}

export interface HistoryItem {
  id: number
  title: string
  amount: number
  account: Account
  category: Category
  description: string
  createdAt: string
  updatedAt: string
}

export interface Account {
  id: number
  accountName: string
  accountNumber: string
  cardNumber: string
}

export interface Category {
  id: number
  type: Type
  categoryName: string
}

export interface Type {
  code: number
  title: string
}

export interface SignupResult {
  email: string
  accessToken: string
  refreshToken: string
}

export interface SigninResult {
  email: string
  accessToken: string
  refreshToken: string
}

export interface AmountByCategory {
  total: string
  categoryName: string
}

export interface AmountPerRange {
  month: string
  groupBy: string
  balances: string[]
}

export interface BalanceByAccount {
  id: number
  accountName: string
  accountNumber: string | null
  balance: number | null
  date: string
  cardNumber: string | null
}

export interface MainStatsReducer {
  amountByCategory: AmountByCategory[]
  amountPerRange: AmountPerRange
  balanceByAccount: BalanceByAccount[]
  isLoading: boolean
}

export interface TableHeader {
  headerClassName: string
  header: string
}
