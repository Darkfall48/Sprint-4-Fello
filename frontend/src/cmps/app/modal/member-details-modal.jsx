import { CgClose } from 'react-icons/cg'
import { utilService } from '../../../services/util.service'
import { updateTask } from '../../../store/actions/board.actions'

export function MemberDetailsModal({ onCloseModal, member, imgRef, task, group }) {

  async function removeMemberFromTask(memberId) {
    let updatedMemberIds = []
    updatedMemberIds = task?.memberIds?.filter(mmbrId => mmbrId !== memberId)
    // console.log('updatedMemberIds', updatedMemberIds)
    const newTask = { ...task, memberIds: updatedMemberIds }
    onCloseModal()
    try {
      await updateTask(group, newTask)
    } catch (err) {
      console.log('Failed to change task member', err)
    }
  }

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
        <button className='action-btn' onClick={() => removeMemberFromTask(member?._id)} >Remove from card</button>
      </div>
    </div>
  )
}
