//? Icon
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Modal } from '../../../../app/modal'
import { MemberDetailsModal } from '../../../../app/modal/member-details-modal'

export function SetMembers({ type, board, task, group }) {
  const members = board?.members
  const [modalOpen, setModalOpen] = useState('')
  const [currMember, setCurrMember] = useState([])

  const { memberIds } = task

  function onCloseModal() {
    setModalOpen('')
  }

  switch (type) {
    //* Task Preview
    case 'preview':
      if (!memberIds || !memberIds.length)
        return <article className="task-preview-members"></article>
      return (
        <article className="task-preview-members">
          {memberIds.map((memberId, idx) => {
            const member = members.find((member) => member._id === memberId)
            const { _id, imgUrl, fullname } = member
            return (
              <img
                key={(_id, idx)}
                className="task-preview-members-img"
                src={imgUrl}
                alt={fullname}
                title={fullname}
                onClick={(ev) => {
                  ev.stopPropagation()
                  setCurrMember(member)
                  setModalOpen('member-details')
                }}
              />
            )
          })}
          {modalOpen === 'member-details' && (
            <MemberDetailsModal
              onCloseModal={onCloseModal}
              board={board}
              member={currMember}
            />
          )}
        </article>
      )
      break
    default:
      //* Task Details
      if (!memberIds || !memberIds.length)
        return <article className="task-details-main-members"></article>
      return (
        <article className="task-details-main-members">
          <h2 className="task-details-main-members-title">Members</h2>
          <div className="task-details-main-members-container">
            {memberIds.map((memberId, idx) => {
              const member = members?.find((member) => member._id === memberId)
              return (
                <img
                  key={(memberId, idx)}
                  className="task-details-main-members-container-img"
                  src={member?.imgUrl}
                  alt={member?.fullname}
                  title={member?.fullname}
                />
              )
            })}
            <button
              className="task-details-main-members-add-btn"
              title="Add Members"
              onClick={() => setModalOpen('members')}
            >
              <AiOutlinePlus />
            </button>
            {modalOpen === 'members' && (
              <Modal
                type="task-members"
                modalTitle="Members"
                onCloseModal={onCloseModal}
                task={task}
                group={group}
                board={board}
              />
            )}
          </div>
        </article>
      )
      break
  }
}
