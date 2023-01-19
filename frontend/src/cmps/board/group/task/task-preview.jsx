//? Libraries
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { VscEdit } from 'react-icons/vsc'
//? Services
import { utilService } from '../../../../services/util.service'
import { TaskDetails } from './task-details'

export function TaskPreview({ groupId, task }) {
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const { boardId } = useParams()
  // const board = useRef(boards.filter((board) => board._id === boardId))
  const board = useSelector((storeState) => storeState.boardModule.board)

  //? Private Components
  function SetBackground() {
    const { style } = task
    if (!style.bgColor) return <div className="task-preview-background"></div>
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

    if (!labelIds) return <article className="task-preview-labels"></article>
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

  function SetEditBtn() {
    return (
      <article className="task-preview-edit">
        <button className="task-preview-edit-btn">
          <VscEdit />
        </button>
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
    <section
      className="task-preview-section"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <SetBackground />
      <SetLabels />
      <SetTitle />
      <SetEditBtn />
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
