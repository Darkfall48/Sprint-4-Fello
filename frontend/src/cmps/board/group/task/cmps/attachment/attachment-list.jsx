import { utilService } from '../../../../../../services/util.service.js'
import { ImAttachment } from 'react-icons/im'

export function AttachmentList({ attachments, onRemoveAttachment, }) {
  console.log('attachments', attachments)

  function setLink(attachment) {
    console.log('attachment', attachment)
    if (attachment.img) return attachment.img
    else if (attachment.url) return attachment.url
    else return ''
  }
  return (
    <ul className="task-details-main-attachments-list">
      {attachments.map((attachment, index) => (
        <li
          className="task-details-main-attachments-list-attachment"
          key={attachment.id + index}
        >
          <div className="task-details-main-attachments-list-attachment-media-container">
            <a href={setLink(attachment)} target="_blank">
              {attachment.img && <img src={attachment.img} alt="" />}
              {!attachment.img && <ImAttachment className="task-details-main-attachments-icon attachments-icon" />
              }
              {/* {attachment.type === 'image/png' && (
                <img src={attachment.img} alt={attachment.title} />
              )} */}
              {/* {attachment.type === 'video/mp4' && (
                <iframe
                  className="video-container"
                  src={attachment.img}
                  controls
                ></iframe>
              )} */}
              {/* {attachment.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&  <iframe className="video-container" src={attachment.img}> </iframe>} */}
            </a>
          </div>

          <div className="task-details-main-attachments-list-attachment-content-container">
            <a className="task-details-main-attachments-list-attachment-content-container-title"
              href={setLink(attachment)}
              target="_blank"
            >
              {/* {attachment.img.substring(attachment.img.lastIndexOf('/')+1)} */}
              {attachment.img.replace(/^.*[\\\/]/, '')}
              {attachment.title}
            </a>
            <p className="task-details-main-attachments-list-attachment-content-container-date">
              {utilService.formatTime(attachment.createdAt)} <span> • </span>
              <a
                className="task-details-main-attachments-list-attachment-content-container-remove-btn"
                onClick={() => onRemoveAttachment(attachment.id)}
              >
                Delete
              </a>
              {/* <span> • </span> */}
              {/* <a
                className="task-details-main-attachments-list-attachment-content-container-cover-btn"
                onClick={() => onMakeCover(attachment.img)}
              >
                Make cover
              </a> */}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
