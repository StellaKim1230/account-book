export const getApiHandler = async(url: string, method: string = 'GET') => {
  const option = {
    method,
  }

  try {
    const res = await fetch(`${process.env.DEV_API}${url}`, option)
    const resultJson = await res.json()
    return resultJson

  } catch (err) {
    // add error handler
    console.log(err)
  }
}
