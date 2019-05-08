import { getApiHandler } from '../utils/api'

interface UrlParams {
  url: string
  method?: string
  urlParams?: string
}

export const getAmountApi = async({
  url,
  method = 'GET',
  urlParams,
}: UrlParams) => (
  await getApiHandler(`${url}?${urlParams ? urlParams : ''}`, method) as ApiResponse
)
