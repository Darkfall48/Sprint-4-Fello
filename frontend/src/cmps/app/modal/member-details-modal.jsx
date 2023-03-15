import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { userService } from '../../../services/user/user.service'
import { utilService } from '../../../services/util.service'
import { updateTask } from '../../../store/actions/board.actions'

export function MemberDetailsModal({ onCloseModal, member, imgRef, task, group }) {

  const [users, setUsers] = useState([])
  console.log('users', users)
  console.log('member', member)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const users = await userService.getUsers()
      setUsers(users)
    } catch (err) {
      console.log(err)
    }
  }


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

  function getUserName() {
    const user = users?.find(user => user.fullname = member.fullname)
    console.log('user', user)
    if (!user) return ''
    return user?.username
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
      <div className="modal-member-header-container">
        <span className='modal-member-header'>
          <img src={`${member?.imgUrl}`} alt={`${member?.fullname}`} />
          <span>
            <h6>{member.fullname}</h6>
            <p>{getUserName()}</p>
          </span>
        </span>
        <button id="close-btn" onClick={onCloseModal}>
          <CgClose style={{ color: 'white' }} />
        </button>
      </div>
      <div className='action-btns-container'>
        <button className='action-btn'>View profile info</button>
        <hr />
        <button className='action-btn' onClick={() => removeMemberFromTask(member?._id)} >Remove from card</button>
      </div>
    </div>
  )
}
