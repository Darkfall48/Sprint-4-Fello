import { useState } from 'react'
import { taskService } from '../../../services/board/task.service'
import { updateTask } from '../../../store/actions/board.actions'
import { ImgUploader } from '../../helpers/img-uploader'

export function TaskAttachmentModal({ onCloseModal, group, task }) {
  const [attachmentToAdd, setAttachmentToAdd] = useState(
    taskService.getEmptyAttachment()
  )

  const onUploaded = (bgImg, imgUrl) => {
    console.log('imgUrl', imgUrl)
    attachmentToAdd.img = imgUrl
    // attachmentToAdd.title = imgUrl

    // console.log('attachmentToAdd', attachmentToAdd);
    // setAttachmentToAdd((prevTask) => ({ ...prevTask, img: imgUrl }))
    // updateTask(group, task)
    // console.log('task added ', task);
    onAddAttachment()
  }

  function onAddAttachment() {
    // ev.preventDefault()
    // if (inputRef.current.value === '') return
    task.attachments.push(attachmentToAdd)

    updateTask(group, task)
    onCloseModal()
  }

  return (
    <div className="task-attachment-modal-content">
      <button id="modal-btn-full">
        {' '}
        <ImgUploader onUploaded={onUploaded} />
      </button>
      {/* <button id="modal-btn-full">Trello</button> */}
      {/* <button id="modal-btn-full"> Google Drive </button> */}
      <hr />
      <p>Attach a link</p>
      <input type="text" placeholder="Paste any link here..." />
      <button id="attach-btn">Attach</button>
      <hr />
      <div>
        Tip: You can drag and drop files and links onto cards to upload them.
      </div>
    </div>
  )
}
