import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service'
import { addBoard, updateTask } from '../../../store/actions/board.actions'
import { ImgUploader } from '../../helpers/img-uploader'

export function TaskCoverModal({ task, group, onCloseModal }) {
  const [updatedTask, onupdatedTask] = useState(task)

  function changeBoard(key, value) {
    updatedTask.style = { [key]: value }
    onupdatedTask((prevTask) => ({ ...prevTask, style: { [key]: value } }))
    updateTask(group, updatedTask)
  }

  // function onRemoverCover(key, value){
  //     updatedTask.style = { [key]: value}
  //     onupdatedTask((prevTask) => ({ ...prevTask, style: { [key]: value } }))
  //     updateTask(group, updatedTask)
  // }

  return (
    <div className="task-cover">
      <p>Size</p>
      <div className="cover-size-container">
        <div
          role="button"
          className="cover-size"
          style={
            (updatedTask?.style?.bgImg && {
              background: `url(${updatedTask.style.bgImg}) center center / cover`,
            }) ||
            (updatedTask?.style?.bgColor && {
              background: updatedTask.style.bgColor,
            })
          }
        >
          <div className="cover-lines">
            <div className="line-1"></div>
          </div>
        </div>
        <div
          role="button"
          className="cover-size"
          style={
            (updatedTask?.style?.bgImg && {
              background: `url(${updatedTask.style.bgImg}) center center / cover`,
            }) ||
            (updatedTask?.style?.bgColor && {
              background: updatedTask.style.bgColor,
            })
          }
        ></div>
      </div>
      {/* <button>Remove cover</button> */}

      <p>Colors</p>
      <div className="btns-cover-color">
        {boardService.getCoverColors().map((color, idx) => {
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
