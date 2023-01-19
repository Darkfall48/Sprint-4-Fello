//? Libraries
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { VscEdit } from 'react-icons/vsc'
import { utilService } from '../../../../services/util.service'
import { useParams } from 'react-router'

export function TaskPreview({ task }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const board = useRef(boards.filter((board) => board._id === boardId))

  //? Private Components
  function SetBackground() {
    const { style } = task
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
    const labels = board.current[0].labels
    console.log('Labels', labels)
    const { labelIds } = task
    // const labelIds = null
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
        <button>
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
    // TODO: Get members as props
    const members = board.current[0].members

    const { memberIds } = task

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
    <section className="task-preview-section">
      <SetBackground />
      <SetLabels />
      <SetTitle />
      <SetEditBtn />
      <SetInfos />
      <SetMembers />
    </section>
  )
}
