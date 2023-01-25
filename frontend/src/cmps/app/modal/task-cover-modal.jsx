import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../../../services/connection/event-bus.service"
import { boardService } from "../../../services/board/board.service.local"
import { addBoard, updateTask } from "../../../store/actions/board.actions"
import { ImgUploader } from "../../helpers/img-uploader"

export function TaskCoverModal({ task, group, onCloseModal }) {

    const [updatedTask, onupdatedTask] = useState(task)

    function changeBoard(imgUrl, color) {

        updatedTask.style.bgImg = imgUrl
        updatedTask.style.bgColor = color

        if (!updatedTask.style.bgColor) {
            updatedTask.style.bgImg = imgUrl
            onupdatedTask((prevTask) => ({ ...prevTask, style: { bgImg: imgUrl } }))
            updateTask(group, task)
            console.log('updated task from task cover- img', task );
        }

        if (!updatedTask.style.bgImg) {
            updatedTask.style.bgColor = color
            onupdatedTask((prevTask) => ({ ...prevTask, style: { bgColor: color } }))
            updateTask(group, task)
            console.log('updated task from task cover - color', task );
        }

        onupdatedTask((prevTask) => ({ ...prevTask, style: { bgImg: imgUrl, bgColor: color } }))
            updateTask(group, task)

    }

    const onUploaded = (imgUrl) => {
        console.log('imgUrl', imgUrl);
        updatedTask.style.bgImg = imgUrl
        onupdatedTask((prevTask) => ({ ...prevTask, style: { bgImg: imgUrl, bgColor: '' } }))
        updateTask(group, task)
    }

    return <div className="task-cover">

        <p>Size</p>
        <div className="cover-size-container">
            <div role="button" className="cover-size" style={updatedTask?.style?.bgImg && { background: `url(${updatedTask.style.bgImg}) center center / cover` } || updatedTask?.style?.bgColor && { background: updatedTask.style.bgColor }}>
                <div className="cover-lines">
                    <div className="line-1">

                    </div>
                </div>
            </div>
            <div role="button" className="cover-size" style={updatedTask?.style?.bgImg && { background: `url(${updatedTask.style.bgImg}) center center / cover` } || updatedTask?.style?.bgColor && { background: updatedTask.style.bgColor }}>

            </div>
        </div>
        <button>Remove cover</button>

        <p>Colors</p>
        <div className="btns-cover-color">
            {boardService.getCoverColors().map((color, idx) => {
                return <button key={idx} onClick={() => changeBoard('', color)} className="btn-cover-color" style={{ background: color }}></button>
            })}
        </div>

        <p>Attachments</p>
        <button>Upload a cover image</button>
        <ImgUploader onUploaded={onUploaded} />
        

    </div>
}