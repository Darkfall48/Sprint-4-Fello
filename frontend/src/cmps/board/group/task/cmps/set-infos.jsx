//? Icon
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { FaRegComment } from 'react-icons/fa'
//? Services
import { taskService } from '../../../../../services/board/task.service'

export function SetInfos({ task }) {
  console.log('Taskousssyyyy', task)

  return (
    <article className="task-preview-info">
      <article
        className="task-preview-info-follow"
        title="You are following this card."
      >
        <AiOutlineEye />
      </article>

      <article className="task-preview-info-todo" title="Element of checklist">
        <BsCheck2Square />
        <span>
          {taskService.countIsDone(task)}/{taskService.countTodos(task)}
        </span>
      </article>

      <article
        className="task-preview-info-description"
        title="This card contain a description."
      >
        {task.description && <GrTextAlignFull />}
      </article>

      <article className="task-preview-info-comment" title="Comments">
        <FaRegComment />
        <span>{task.comments.length}</span>
      </article>
    </article>
  )
}
