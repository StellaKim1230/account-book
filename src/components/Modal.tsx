import React, { FC, useRef } from 'react'
import { createPortal } from 'react-dom'

import Button from './Button'

import './Modal.scss'

interface Props {
  header: string
  isShowing: boolean
  hideModal: () => void
}

const modalRoot = document.getElementById('modal-root')

const Modal: FC<Props> = ({ header, children, isShowing, hideModal }) => {
  if (!modalRoot) {
    throw new Error('Modal root not found')
  }
  const divEl = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (divEl.current === e.target) {
      hideModal()
    }
  }

  return isShowing ? createPortal(
    <div className='Modal' ref={divEl} onClick={handleClick}>
      <div className='Modal__wrapper'>
        <p className='Modal__header'>{header}</p>
        {children}
        <Button
          className='Modal__closeButton'
          title='닫기'
          onClick={() => hideModal()}
        />
      </div>
    </div>,
    modalRoot
  ) : null
}

export default Modal
