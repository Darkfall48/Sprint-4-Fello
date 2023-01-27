import { ImAttachment } from 'react-icons/im'
import { updateTask } from '../../../../../store/actions/board.actions'

import { AttachmentList } from './attachment/attachment-list'

export function SetAttachment({ task, attachments, group }) {

  function onRemoveAttachment(attachmentId) {
    const idx = attachments.findIndex(attachment => attachment.id === attachmentId)
    attachments.splice(idx, 1)
    updateTask(group, task)
  }

  return (
    <section className="task-details-main-attachment">
      <ImAttachment className="task-details-main-attachment-icon" />

      <AttachmentList attachments={attachments} onRemoveAttachment={onRemoveAttachment}/>


      {/* <button
        className="attachment-add-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add an Attachment
      </button> */}

      {/* {isModalOpen && <p>add attachment modal</p>} */}

    </section>
  )
}
