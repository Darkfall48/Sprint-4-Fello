//? Libraries
import { useState } from 'react'
import { useSelector } from 'react-redux'
//? Services
import { utilService } from '../../../../services/util.service'
//? Components
import { TaskDetails } from './task-details'
import { SetEditBtn } from './cmps/set-edit-btn'
import { SetTitle } from './cmps/set-title'
import { SetMembers } from './cmps/set-members'
import { SetLabels } from './cmps/set-labels'
import { SetInfos } from './cmps/set-infos'

export function TaskPreview({ groupId, task, onArchiveTask }) {
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log('Is modal open?', isModalOpen)
  // const { boardId } = useParams()
  // const board = useRef(boards.filter((board) => board._id === boardId))
  const board = useSelector((storeState) => storeState.boardModule.board)

  //? Private Components
  function SetBackground() {
    const { style } = task
    if (!style.bgColor)
      return <div className="task-preview-no-background"></div>
    return (
      <article
        className="task-preview-background"
        style={{
          backgroundColor: style.bgColor,
        }}
      ></article>
    )
  }

<<<<<<< Updated upstream
=======
  function SetLabels() {
    const labels = board.labels
    const { labelIds } = task

    if (!labelIds || !labelIds.length)
      return <article className="task-preview-no-labels"></article>
    return (
      <article className="task-preview-labels">
        {labelIds.map((labelId) => {
          const label = labels.find((label) => label.id === labelId)
          return (
            <span
              className="task-preview-label"
              key={label.id}
              style={{ backgroundColor: label.color }}
              title={label.title ? label.title : 'None'}
            ></span>
          )
        })}
      </article>
    )
  }

  function SetTitle() {
    return (
      <article className="task-preview-title">
        <p>{task.title}</p>
      </article>
    )
  }

  function SetEditBtn({ onArchiveTask }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function closeMenu(ev) {
      ev.preventDefault()
      setIsMenuOpen(false)
    }

    function onTaskPreviewEdit(ev) {
      ev.stopPropagation()
      ev.preventDefault()
      setIsMenuOpen(!isMenuOpen)
    }

    function quickMenuClicked(ev) {
      ev.stopImmediatePropagation()
      ev.stopPropagation()
      ev.preventDefault()
      setIsMenuOpen(false)
    }

    return (
      <article className="task-preview-edit">
        <button className="task-preview-edit-btn" onClick={onTaskPreviewEdit}>
          <VscEdit />
        </button>
        {isMenuOpen &&
          <div className='task-preview-edit-menu' onBlur={(ev) => (closeMenu(ev))}>
            <button className='task-preview-edit-menu-btn'
              onClick={(ev) => onArchiveTask(task.id, ev)}
              onKeyUp={quickMenuClicked}>
              <HiOutlineArchive />
              <span>Archive</span>
            </button>
          </div>
        }
      </article>
    )
  }

  function SetInfos() {
    return (
      <article className="task-preview-info">
        <AiOutlineEye /> <BsCheck2Square /> 0/5
      </article>
    )
  }

  function SetMembers() {
    const members = board.members
    const { memberIds } = task

    if (!members) return <article className="task-preview-member"></article>
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
  }

>>>>>>> Stashed changes
  return (
    <section
      className="task-preview-section"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      {task.style && <SetBackground />}
      {task.labelIds && (
        <SetLabels type={'preview'} board={board} task={task} />
      )}
      {task.title && <SetTitle type="preview" task={task} />}
      <SetEditBtn onArchiveTask={onArchiveTask} task={task} />
      <SetInfos task={task} />
      <SetMembers type={'preview'} board={board} task={task} />
      {isModalOpen && (
        <TaskDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          groupId={groupId}
          task={task}
        />
      )}
    </section>
  )
}
