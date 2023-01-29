//? Icon
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { ImAttachment } from 'react-icons/im'
//? Services
import { taskService } from '../../../../../services/board/task.service'

export function SetInfos({ task }) {
  //   console.log('Taskousssyyyy', task)

  function SetFollow() {
    if (!task.priority || task.priority !== 'high')
      // return <article className="task-preview-infos-no-follow"></article>
      return
    return (
      <article
        className="task-preview-infos-follow"
        title="You are receiving notifications for updates on this card"
      >
        <AiOutlineEye />
      </article>
    )
  }

  function SetDescription() {
    if (!task.description)
      // return <article className="task-preview-infos-no-description"></article>
      return
    return (
      <article
        className="task-preview-infos-description"
        title="This card contain a description."
      >
        {task.description && <GrTextAlignFull />}
      </article>
    )
  }

  function SetComments() {
    if (!task?.comments || !task?.comments?.length) return
    const countComments = task?.comments?.length
    return (
      <article className="task-preview-infos-comment" title="Comments">
        <FaRegComment />
        <span>{countComments}</span>
      </article>
    )
  }

  function SetAttachments() {
    if (!task?.attachments || !task?.attachments?.length) return
    const countAttachments = task?.attachments?.length
    return (
      <article
        className="task-preview-infos-attachments"
        title="Element of attachments"
      >
        <ImAttachment />
        <span>{countAttachments}</span>
      </article>
    )
  }

  function SetTodos() {
    const isDoneCount = +taskService.countIsDone(task)
    const todosCount = +taskService.countTodos(task)
    const isComplete = isDoneCount === todosCount ? true : false

    if (!task.checklists || !task.checklists.length || !todosCount)
      // return <article className="task-preview-infos-no-todo"></article>
      return
    return (
      <article
        className={`task-preview-infos-todo${isComplete ? ' complete' : ''}`}
        title="Element of checklist"
      >
        <BsCheck2Square />
        <span>
          {isDoneCount}/{todosCount}
        </span>
      </article>
    )
  }

  return (
    <article className="task-preview-infos">
      <SetFollow />
      {/* Dates */}
      <SetDescription />
      <SetComments />
      <SetAttachments />
      <SetTodos />
    </article>
  )
}
