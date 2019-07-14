import { ApiResponse } from '../types'

export const apiHandler = async <T>(url: string, method: string = 'GET', body?: any): Promise<ApiResponse<T>> => {
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
  const bearerToken = `Bearer ${token}`

  const contentType = { 'Content-Type': 'application/json; charset=utf-8' }

  const headers = token ? { ...contentType, Authorization: bearerToken } : contentType

  const config = {
    method,
    body,
    headers,
  }

  try {
    const res = await fetch(`${process.env.API_URL}${url}`, config)
    return res.json()

  } catch (err) {
    // add error handler
    console.error(err)
    return err
  }
}
