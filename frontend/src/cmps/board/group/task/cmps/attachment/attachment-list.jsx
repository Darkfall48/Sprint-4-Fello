import { useState } from 'react'
import { attachmentEdit } from './attachment-edit.jsx'
import { attachmentPreview } from './attachment-preview.jsx'
import { AiOutlineClose } from 'react-icons/ai'

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
            <h3 className="attachment-title">
              {attachment.title}
            </h3>
          </div>

          {/* <div className="task-details-main-checklist-attachments-list-attachment-btn-container"> */}
          <button className="attachment-remove-btn" onClick={() => onRemoveAttachment(attachment.id)}>
            Delete
          </button>
             {/* </div> */}
        </li>
      ))}
    </ul>
  )
}

