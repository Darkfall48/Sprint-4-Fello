import { useRef, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { updateTask } from '../../../../../store/actions/board.actions'
import { Modal } from '../../../../app/modal'
import { TaskAttachmentModal } from '../../../../app/modal/task-attachment-modal'

import { AttachmentList } from './attachment/attachment-list'

export function SetAttachment({ task, attachments, group }) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const buttonRef = useRef()

  function onRemoveAttachment(attachmentId) {
    const idx = attachments.findIndex(attachment => attachment.id === attachmentId)
    attachments.splice(idx, 1)
    updateTask(group, task)
  }

  function onCloseModal(){
    setIsModalOpen(!isModalOpen)
  }

  function onMakeCover(imgUrl) {
    // task.style.bgImg = imgUrl
    // console.log('task new task', task);
    // updateTask(group, task)
  }

  return (
    <section className="task-details-main-attachment">
      <ImAttachment className="task-details-main-attachment-icon" />
      <h3 className="task-details-main-attachment-title" >Attachments</h3>

      <AttachmentList attachments={attachments} onRemoveAttachment={onRemoveAttachment} onMakeCover={onMakeCover} />


      <button 
      ref={buttonRef}
        className="attachment-add-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add an Attachment
      </button>

      {isModalOpen && <Modal
                  type="task-attachment"
                  modalTitle="Attach from…"
                  onCloseModal={onCloseModal}
                  group={group}
                  task={task}
                  buttonRef={buttonRef}
                />}

    </section>
  )
}
