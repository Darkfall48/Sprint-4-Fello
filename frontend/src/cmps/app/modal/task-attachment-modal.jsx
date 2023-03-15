import { useState } from 'react'
import { taskService } from '../../../services/board/task.service'
import { updateTask } from '../../../store/actions/board.actions'
import { ImgUploader } from '../../helpers/img-uploader'

export function TaskAttachmentModal({ onCloseModal, group, task }) {
  const [attachmentToAdd, setAttachmentToAdd] = useState(taskService.getEmptyAttachment())
  const [selectedFile, setSelectedFile] = useState()
  const [file, setFile] = useState()
  const [link, setLink] = useState('')

  function handleChange(event) {
    console.log('event.target.files[0]', event.target.files[0]);
    setSelectedFile(event.target.files[0]);

    attachmentToAdd.title = event.target.files[0].name
    attachmentToAdd.type = event.target.files[0].type
    setFile(URL.createObjectURL(event.target.files[0]));
    attachmentToAdd.img = URL.createObjectURL(event.target.files[0])

    console.log('attachmentToAdd', attachmentToAdd);

    onAddAttachment()
  }

  const onUploaded = (bgImg, imgUrl) => {
    console.log('imgUrl', imgUrl)
    attachmentToAdd.img = imgUrl
    onAddAttachment()
  }

  function onAddAttachment() {
    task.attachments.push(attachmentToAdd)
    updateTask(group, task)
    onCloseModal()
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setAttachmentToAdd((prevAttachment) => ({ ...prevAttachment, [field]: value, title: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onAddAttachment() 
  }

  return (
    <div className="task-attachment-modal-content">
      <button id="modal-btn-full">
        {' '}
        <ImgUploader onUploaded={onUploaded} />
      </button>
      {/* <form> */}
      {/* <label htmlFor="file">Computer</label>
        <input type="file" name="file" className='attachment-input' id='file' onChange={handleChange} style={{display: 'none'}}/> */}
      {/* </form> */}
      {/* <button id="modal-btn-full">Trello</button> */}
      {/* <button id="modal-btn-full"> Google Drive </button> */}
      <hr />
      <p>Attach a link</p>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" placeholder="Paste any link here..." name='url' value={attachmentToAdd.url} onChange={handleChange} />
        <button id="attach-btn" >Attach</button>
      </form>
      <hr />
      <div>
        Tip: You can drag and drop files and links onto cards to upload them.
      </div>
    </div>
  )
}
