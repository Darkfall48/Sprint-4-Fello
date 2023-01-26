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
  console.log('style', style);
  if (!style?.bgColor && !style?.bgImg)
    return (
      <div className="task-details-header-cover">
        <SetCloseBtn />
      </div>
    )
  return (
    <div
      className="task-details-header-cover"
      style={style?.bgImg ? { background: `url(${style.bgImg})`, backgroundSize: 'contain', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'  } : { background: style.bgColor }}
    >
      {/* <img src={style.bgImg} alt="" /> */}
      <button title="Change cover"
        onClick={() => setModalOpen(true)}
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
