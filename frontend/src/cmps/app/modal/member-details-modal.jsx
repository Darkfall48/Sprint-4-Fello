import { CgClose } from 'react-icons/cg'
import { utilService } from '../../../services/util.service'

export function MemberDetailsModal({ onCloseModal, board, member, imgRef }) {
  console.log('Memberrrr', member)
  return (
    <div
      className="modal-content member-details-modal-container"
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
        <span className=''>
          <img src={`${member?.imgUrl}`} alt={`${member?.fullname}`} />
          <h6>{member.fullname}</h6>
        </span>
        <button id="close-btn" onClick={onCloseModal}>
          <CgClose style={{ color: 'white' }} />
        </button>
      </div>
      <div className='action-btns-container'>
      <button className='action-btn'>Edit profile info</button>
      <hr />
      <button className='action-btn'>Remove from card</button>
      </div>
    </div>
  )
}
