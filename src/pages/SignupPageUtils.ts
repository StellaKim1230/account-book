export const emailCheck = (email: string) => {
  const emailPattern = /^[\w-.%]+@([\w-]{2,}\.)+[a-zA-Z]{2,4}$/

  if (!emailPattern.test(email)) return false

  return true
}

export const passwordCheck = (password: string) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).{8,}$/

  if (!passwordPattern.test(password)) return false

  return true
}
