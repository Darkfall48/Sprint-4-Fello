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
