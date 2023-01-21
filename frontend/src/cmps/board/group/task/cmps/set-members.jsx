//? Icon
import { AiOutlinePlus } from 'react-icons/ai'

export function SetMembers({ type, board, task }) {
  const members = board.members
  const { memberIds } = task

  switch (type) {
    //* Task Preview
    case 'preview':
      if (!memberIds || !memberIds.length)
        return <article className="task-preview-member"></article>
      return (
        <article className="task-preview-member">
          {memberIds.map((memberId) => {
            const member = members.find((member) => member._id === memberId)
            const { _id, imgUrl, fullname } = member
            return (
              <img
                key={_id}
                className="task-preview-img"
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
        return <article className="task-details-section-members"></article>
      return (
        <article className="task-details-section-members">
          <h2 className="task-details-section-members-title">Members</h2>
          <div className="task-details-section-members-container">
            {memberIds.map((memberId) => {
              const member = members.find((member) => member._id === memberId)
              const { _id, imgUrl, fullname } = member
              return (
                <img
                  key={_id}
                  className="task-details-section-members-container-img"
                  src={imgUrl}
                  alt={fullname}
                  title={fullname}
                />
              )
            })}
            <button
              className="task-details-section-members-add-btn"
              title="Add Members"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </article>
      )
      break
  }
}
