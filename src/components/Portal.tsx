import { FC } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  position: 'top' | 'bottom'
}

const Portal: FC<Props> = ({ children, position }) => {
  const portalRoot = document.getElementById(`portal-${position}`)

  if (!portalRoot) { return null }

  return createPortal(
    children,
    portalRoot
  )
}

export default Portal
