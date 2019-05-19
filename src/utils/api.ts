export const apiHandler = async (url: string, method: string = 'GET', body?: any): Promise<ApiResponse | undefined> => {
  const token = sessionStorage.getItem('accessToken')
  const bearerToken = `Bearer ${token}`

  const contentType = { 'Content-Type': 'application/json; charset=utf-8' }

  const headers = token ? { ...contentType, Authorization: bearerToken } : contentType

  const config = {
    method,
    body,
    headers,
  }

  try {
    const res = await fetch(`${process.env.DEV_API}${url}`, config)
    const resultJson = await res.json()
    return resultJson

  } catch (err) {
    // add error handler
    console.error(err)
  }
}
