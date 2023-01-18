//? Libraries
import { useEffect, useRef, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { VscEdit } from 'react-icons/vsc'
import { utilService } from '../../../../services/util.service'

export function TaskPreview({ task }) {
  //? Private Components
  function BackgroundArticle() {
    return (
      <article
        className="task-preview-background"
        style={{
          backgroundColor: task
            ? utilService.getRandomColor()
            : task.style.bgColor,
        }}
      ></article>
    )
  }

  function LabelArticle() {
    return <article className="task-preview-label">Labels</article>
  }
  return (
    <section className="task-preview-section">
      <BackgroundArticle />
      <LabelArticle />
      <article className="task-preview-title">
        <p>{task.title}</p>
      </article>
      <article className="task-preview-edit">
        <VscEdit />
      </article>
      <article className="task-preview-info">
        <AiOutlineEye /> <BsCheck2Square /> 0/5
      </article>
      <article className="task-preview-member">Sidney, Keren, Yael</article>
      {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
      <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}
    </section>
  )
}
