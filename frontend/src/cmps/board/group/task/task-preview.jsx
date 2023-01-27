//? Libraries
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//? Components
import { SetCover } from './cmps/set-cover'
import { SetEditBtn } from './cmps/set-edit-btn'
import { SetTitle } from './cmps/set-title'
import { SetMembers } from './cmps/set-members'
import { SetLabels } from './cmps/set-labels'
import { SetInfos } from './cmps/set-infos'
import { useRef } from 'react'

export function TaskPreview({
  groupId,
  task,
  onArchiveTask,
  handleLabelClick,
  labelsPreview,
  mode
}) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const navigate = useNavigate()

  return (
    <section
      className="task-preview-section"
      onClick={(ev) => {
        ev.stopPropagation()
        navigate(`/board/${board._id}/group/${groupId}/task/${task.id}`)
      }}
    >
      {task.style && <SetCover task={task} />}
      {task.labelIds && (
        <SetLabels
          handleLabelClick={handleLabelClick}
          type={labelsPreview}
          board={board}
          task={task}
        />
      )}
      {task.title && <SetTitle type="preview" task={task} mode={mode} />}
      {mode!=='quick-edit'&&
      <SetEditBtn
        onArchiveTask={onArchiveTask}
        task={task}
        handleLabelClick={handleLabelClick}
        key={task.id}
        groupId={groupId}
        labelsPreview={labelsPreview} />
      }
      <SetInfos task={task} />
      <SetMembers type={'preview'} board={board} task={task} />
    </section>
  )
}
