import { useState, useRef, useEffect } from 'react'

type Validator = (value: string) => boolean

const useValidator = (defaultValue: string, validator: Validator | null) => {
  const [ value, setValue ] = useState(defaultValue)
  const [ touched, setTouched ] = useState(false)
  const inputEl = useRef<HTMLInputElement>(null)
  let isError

  useEffect(() => {
    const { current } = inputEl
    if (!current) return

    current.addEventListener('blur', () => {
      setTouched(true)
    })

    return current.removeEventListener('blur', () => {
      setTouched(true)
    })
  }, [])

  if (validator) {
    isError = touched && !validator(value)
  }

  return {
    value,
    isError,
    setValue,
    inputEl,
  }
}

export default useValidator
