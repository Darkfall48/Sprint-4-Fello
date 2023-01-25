import { ImgUploader } from "../../helpers/img-uploader";

export function TaskAttachmentModal({ board, onCloseModal, group, task }) {
 
    const onUploaded = (imgUrl) => {
        console.log('imgUrl', imgUrl);
        // updatedTask.style.bgImg = imgUrl
        // onupdatedTask((prevTask) => ({ ...prevTask, style: { bgImg: imgUrl, bgColor: '' } }))
        // updateTask(group, task)
    }


    return <div className="task-attachment-modal-content">


        <button id='modal-btn-full'> <ImgUploader onUploaded={onUploaded} /></button>
        <button id='modal-btn-full'>Trello</button>
        <button id='modal-btn-full' > Google Drive </button>
        <hr />
        <p>Attach a link</p>
        <input type="text" placeholder="Paste any link here..." />
        <button id="attach-btn">Attach</button>
        <hr />
        <div>Tip: You can drag and drop files and links onto cards to upload them.</div>
    </div>
}