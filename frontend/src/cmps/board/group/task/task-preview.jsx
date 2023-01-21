//? Libraries
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { VscEdit } from 'react-icons/vsc'
import { HiOutlineArchive } from 'react-icons/hi'
//? Services
import { utilService } from '../../../../services/util.service'
import { TaskDetails } from './task-details'

export function TaskPreview({ groupId, task, onArchiveTask }) {
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

    return (
      <article className="task-preview-edit">
        <button className="task-preview-edit-btn" onClick={onTaskPreviewEdit}>
          <VscEdit />
        </button>
        {isMenuOpen &&
          <div className='task-preview-edit-menu' onBlur={(ev) => (closeMenu(ev))}>
            <button className='task-preview-edit-menu-btn'
              onClick={(ev) => onArchiveTask(task.id, ev)}>
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

  return (
    <section
      className="task-preview-section"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      {task.style && <SetBackground />}
      {task.labelIds && <SetLabels />}
      {task.title && <SetTitle />}
      <SetEditBtn onArchiveTask={onArchiveTask} />
      <SetInfos />
      <SetMembers />
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
