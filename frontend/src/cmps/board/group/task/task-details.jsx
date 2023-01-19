//? Libraries
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineEye } from 'react-icons/ai'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'
import { func } from 'prop-types'

export function TaskDetails({ isModalOpen, setIsModalOpen, groupId, task }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { current: group } = useRef(
    board.groups.filter((group) => group.id === groupId)[0]
  )
  console.log('Grouppyyyy', group)
  console.log('Boardyyyy', board)
  console.log('GroupIddddd', groupId)
  console.log('Taskkkk', task)

  function SetHeader() {
    const { style } = task
    if (!style.bgColor)
      return <div className="task-details-section-header"></div>
    return (
      <div
        className="task-details-section-header"
        style={{ backgroundColor: style.bgColor }}
      >
        I'm a colored Header
      </div>
    )
  }

  function SetCloseBtn() {
    return (
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        <VscClose />
      </button>
    )
  }

  function SetTitle() {
    return (
      <article className="task-details-section-title">
        <BsReverseLayoutTextWindowReverse />
        <input
          className="task-details-section-title-icon"
          type="text"
          name="task-title"
          id="task-title"
          defaultValue={task.title}
        />
        <p className="task-details-section-title-description">
          In the list
          <a className="task-details-section-title-description-link" href="#">
            {' ' + group.title}
          </a>
          <AiOutlineEye />
        </p>
      </article>
    )
  }

  function SetLabels() {
    const labels = board.labels
    const { labelIds } = task

    if (!labelIds)
      return <article className="task-details-section-labels"></article>
    return (
      <article className="task-details-section-labels">
        <h2 className="task-details-section-labels-title">Labels</h2>
        <div className="task-details-section-labels-container">
          {labelIds.map((labelId) => {
            const label = labels.find((label) => label.id === labelId)
            return (
              <span
                className="task-details-section-labels-container-label"
                key={label.id}
                style={{ backgroundColor: label.color }}
                title={label.title ? label.title : 'None'}
              ></span>
            )
          })}
        </div>
      </article>
    )
  }

  function SetMembers() {
    const members = board.members
    const { memberIds } = task

    if (!members)
      return <article className="task-details-section-members"></article>
    return (
      <article className="task-details-section-members">
        {memberIds.map((memberId) => {
          const member = members.find((member) => member._id === memberId)
          const { _id, imgUrl, fullname } = member
          return (
            <img
              key={_id}
              className="task-details-section-members-img"
              src={imgUrl + fullname}
              alt={fullname}
              title={fullname}
            />
          )
        })}
      </article>
    )
  }

  return (
    <main
      className="task-details-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <section
        className="task-details-section"
        onClick={(e) => e.stopPropagation()}
      >
        <SetHeader />
        <SetCloseBtn />
        <SetTitle />
        <SetLabels />
        <SetMembers />
      </section>
    </main>
  )
}
