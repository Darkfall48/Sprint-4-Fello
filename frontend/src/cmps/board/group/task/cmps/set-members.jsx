//? Icon
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Modal } from '../../../../app/modal'

export function SetMembers({ type, board, task, group }) {
  const members = board?.members
  const [modalOpen, setModalOpen] = useState('')

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
          {memberIds.map((memberId) => {
            const member = members.find((member) => member._id === memberId)
            const { _id, imgUrl, fullname } = member
            return (
              <img
                key={_id}
                className="task-preview-members-img"
                src={imgUrl}
                alt={fullname}
                title={fullname}
              />
            )
          })}
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
            {memberIds.map((memberId) => {
              const member = members?.find((member) => member._id === memberId)
              return (
                <img
                  key={memberId}
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
