import { utilService } from '../../../../../../services/util.service.js'

export function AttachmentList({ attachments, onRemoveAttachment }) {

  return (

    <ul className="task-details-main-attachment-list">
      {attachments.map((attachment, index) => (
        <li
          className="task-details-main-attachments-list-attachment"
          key={index}
        >
          <div className="task-details-main-attachment-preview">
            <a href={attachment.img} target="_blank">
              <img src={attachment.img} alt="" />
            </a>
          </div>
          <h3 className="attachment-title">
            {/* {attachment.img.substring(attachment.img.lastIndexOf('/')+1)} */}
            {attachment.img.replace(/^.*[\\\/]/, '')}
          </h3>
          <p>{utilService.formatTime(attachment.createdAt)}</p>
          <button className="attachment-remove-btn" onClick={() => onRemoveAttachment(attachment.id)}>
            Delete
          </button>

        </li>
      ))}
    </ul>
  )
}

