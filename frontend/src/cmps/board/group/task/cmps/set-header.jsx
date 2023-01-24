//? Icons
import { useState } from 'react'
import { MdOutlineLaptop } from 'react-icons/md'
//? Components
import { Modal } from '../../../../app/modal'
import { SetCloseBtn } from './set-close-btn'

export function SetHeader({ task }) {
  const { style } = task
  const [modalOpen, setModalOpen] = useState(false)

  function onCloseModal() {
    setModalOpen(false)
  }

  if (!style?.bgColor)
    return (
      <div className="task-details-header-cover">
        <SetCloseBtn />
      </div>
    )
  return (
    <div
      className="task-details-header-cover"
      style={{ backgroundColor: style.bgColor }}
    >
      <button title="Change cover"
      onClick={()=>setModalOpen(true)}
      >
        <MdOutlineLaptop /> Cover
      </button>
      {modalOpen && <Modal 
      type={'task-cover'}
      modalTitle={'Cover'}
      task={task} 
      onCloseModal={onCloseModal} 
      />}
    </div>
  )
}
