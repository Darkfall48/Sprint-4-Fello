import { useState } from 'react'
import { updateTask } from '../../../store/actions/board.actions'
import { ImgUploader } from '../../helpers/img-uploader'
import { taskService } from '../../../services/board/task.service'

export function TaskCoverModal({ task, group, onCloseModal }) {
  const [updatedTask, onupdatedTask] = useState(task)

  function changeBoard(key, value) {
    updatedTask.style = { [key]: value }
    onupdatedTask((prevTask) => ({ ...prevTask, style: { [key]: value } }))
    updateTask(group, updatedTask)
  }

  return (
    <div className="task-cover">
      <button className='modal-btn-full' onClick={() => changeBoard('bgColor', '')}>Remove cover</button>

      <p>Colors</p>
      <div className="btns-cover-color">
        {taskService.getCoverColors().map((color, idx) => {
          return (
            <button
              key={idx}
              onClick={() => changeBoard('bgColor', color)}
              className="btn-cover-color"
              style={{ background: color }}
            ></button>
          )
        })}
      </div>

      <p>Attachments</p>
      <ImgUploader onUploaded={changeBoard} />
    </div>
  )
}
