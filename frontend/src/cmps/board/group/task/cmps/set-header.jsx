//? Icons
import { useState } from 'react'
import { MdOutlineLaptop } from 'react-icons/md'
//? Components
import { Modal } from '../../../../app/modal'
import { SetCloseBtn } from './set-close-btn'

export function SetHeader({ task, group }) {
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
      style={style?.bgColor ? { background: `url(${style.bgColor})` }: {background: 'rgb(185, 199, 206)'}}
    >
      <img src={style.bgImg} alt="" />
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
      group={group}
      />}
    </div>
  )
}
