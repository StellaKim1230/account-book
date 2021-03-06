export interface History {
  count: number
  histories: HistoryItem[]
}

export interface HistoryItem {
  id: number
  title: string
  amount: number
  account: Pick<Account, 'id' | 'accountName' | 'accountNumber' | 'cardNumber'>
  category: Pick<Category, 'id' | 'categoryName' | 'type'>
  description: string
  createdAt: Date
  updatedAt: Date
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

export interface Category {
  [key: string]: number | string | Partial<Type> | Date
  id: number
  type: Pick<Type, 'code' | 'title'>
  userId: number
  categoryName: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Type {
  code: number
  title: string
  categories: Pick<Category, 'id' | 'categoryName' | 'createdAt' | 'updatedAt'>
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  [key: string]: string | number | undefined | Date
  id: number
  userId: number
  accountName: string
  accountNumber?: string
  accountTYpeId?: string
  balance: string
  cardNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface TableHeader {
  headerClassName: string
  header: string
}
