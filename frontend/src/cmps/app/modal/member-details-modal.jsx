import { CgClose } from 'react-icons/cg'
import { utilService } from '../../../services/util.service'

export function MemberDetailsModal({ onCloseModal, board, member, imgRef }) {
  console.log('Memberrrr', member)
  return (
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
      onBlur={onCloseModal}
      style={{
        top: utilService.getPosition(imgRef).top + 32 + 'px',
        left: utilService.getPosition(imgRef).left + 2 + 'px',
        width: 280 + 'px',
        height: 209 + 'px'
      }}
    >
      <div className="modal-member-header">
        <h6>{member.fullname}</h6>
        <button id="close-btn" onClick={(ev) => {
          ev.stopPropagation()
          onCloseModal(ev)
        }}>
          <CgClose style={{ color: 'white' }} />
        </button>
      </div>
      Member
    </div>
  )
}
