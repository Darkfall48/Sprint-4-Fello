import { useRef, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { updateTask } from '../../../../../store/actions/board.actions'
import { MainModal } from '../../../../app/main-modal'
import { TaskAttachmentModal } from '../../../../app/modal/task-attachment-modal'

import { AttachmentList } from './attachment/attachment-list'

export function SetAttachment({ task, attachments, group }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [setCover, onSetCover] = useState(task.style)
  const buttonRef = useRef()

  function onRemoveAttachment(attachmentId) {
    const idx = attachments.findIndex(
      (attachment) => attachment.id === attachmentId
    )
    attachments.splice(idx, 1)
    updateTask(group, task)
  }

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function onMakeCover(imgUrl) {
    // setCover.bgImg = imgUrl
    // onSetCover((prevStyle) => ({ ...prevStyle, imgUrl }))
    // console.log('setCover', setCover);
    // updateTask(group, task)
  }

  return (
    <section className="task-details-main-attachments">
      <ImAttachment className="task-details-main-attachments-icon" />
      <h3 className="task-details-main-attachments-title">Attachments</h3>

      <AttachmentList
        attachments={attachments}
        onRemoveAttachment={onRemoveAttachment}
        onMakeCover={onMakeCover}
      />

     {!(attachments.length === 0) && <button
        ref={buttonRef}
        className="task-details-main-attachments-add-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add an Attachment
      </button>}

      {isModalOpen && (
        <MainModal
          type="task-attachment"
          modalTitle="Attach from…"
          onCloseModal={onCloseModal}
          group={group}
          task={task}
          buttonRef={buttonRef}
        />
      )}
    </section>
  )
}
