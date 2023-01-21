//? Libraries
import { useRef } from 'react'
import { useSelector } from 'react-redux'
//? Icons
import { AiOutlineEye, AiOutlinePlus } from 'react-icons/ai'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { VscClose } from 'react-icons/vsc'

export function TaskDetails({ isModalOpen, setIsModalOpen, groupId, task }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { current: group } = useRef(
    board.groups.filter((group) => group.id === groupId)[0]
  )
  console.log('Taskkyyyy', task)
  console.log('GroupIddddd', groupId)
  console.log('Grouppyyyy', group)
  console.log('Boardyyyy', board)

  function SetHeader() {
    const { style } = task
    if (!style.bgColor)
      return (
        <div className="task-details-section-header">
          <SetCloseBtn />
        </div>
      )
    return (
      <div
        className="task-details-section-header"
        style={{ backgroundColor: style.bgColor }}
      ></div>
    )
  }

  function SetCloseBtn() {
    return (
      <button
        className="task-details-section-close-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <VscClose />
      </button>
    )
  }

  function SetTitle() {
    return (
      <article className="task-details-section-title">
        <textarea
          className="task-details-section-title-input"
          type="text"
          name="task-title"
          id="task-title"
          defaultValue={task.title}
        />
        <p className="task-details-section-title-description">
          <h2 className="task-details-section-title-description-title">
            In the list
          </h2>
          <a className="task-details-section-title-description-link" href="#">
            {' ' + group.title}
          </a>
          <AiOutlineEye
            title="Followed"
            className="task-details-section-title-description-icon"
          />
        </p>
      </article>
    )
  }

  function SetLabels() {
    const labels = board.labels
    const { labelIds } = task

    if (!labelIds || !labelIds.length)
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
                style={{ backgroundColor: label.color + '66' }}
                title={label.title ? label.title : ''}
              >
                <div
                  className="task-details-section-labels-container-circle"
                  style={{ backgroundColor: label.color }}
                ></div>
                <span className="task-details-section-labels-container-title">
                  {label.title ? label.title : 'None'}
                </span>
              </span>
            )
          })}
          <button
            className="task-details-section-labels-add-btn"
            title="Add Label"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </article>
    )
  }

  function SetMembers() {
    const members = board.members
    const { memberIds } = task

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
  }

  function SetDescription() {
    const { description } = task

    if (!description)
      return <section className="task-details-section-description"></section>
    return (
      <section className="task-details-section-description">
        <h2 className="task-details-section-description-title">Description</h2>
        <textarea
          className="task-details-section-description-input"
          type="text"
          name="task-description"
          id="task-description"
          defaultValue={description}
        />
      </section>
    )
  }

  return (
    <main
      className="task-details-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <section
        className="task-details-section"
        onClick={(ev) => ev.stopPropagation()}
      >
        <SetCloseBtn />
        {task.style.bgColor && <SetHeader />}
        <BsReverseLayoutTextWindowReverse className="task-details-section-title-icon" />
        <SetTitle />
        {task.labelIds && <SetLabels />}
        {task.memberIds && <SetMembers />}
        <GrTextAlignFull className="task-details-section-description-icon" />
        <SetDescription />
      </section>
    </main>
  )
}
