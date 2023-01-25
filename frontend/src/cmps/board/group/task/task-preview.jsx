//? Libraries
import { useState } from 'react'
import { useSelector } from 'react-redux'
//? Services
import { utilService } from '../../../../services/util.service'
//? Components
import { SetEditBtn } from './cmps/set-edit-btn'
import { SetTitle } from './cmps/set-title'
import { SetMembers } from './cmps/set-members'
import { SetLabels } from './cmps/set-labels'
import { SetInfos } from './cmps/set-infos'
import { useNavigate } from 'react-router-dom'

export function TaskPreview({ groupId, task, onArchiveTask }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [labelsPreview, setLabelsPreview] = useState('preview-simple')
  const navigate = useNavigate()

  //? Private Components
  function SetCover() {
    const { style } = task
    if (!style.bgColor) return <div className="task-preview-no-cover"></div>
    return (
      <article
        className="task-preview-cover"
        style={{
          backgroundColor: style.bgColor,
        }}
      ></article>
    )
  }

  function handleLabelClick() {
    setLabelsPreview(
      labelsPreview === 'preview-simple' ? 'preview-detailed' : 'preview-simple'
    )
  }

  return (
    <section
      className="task-preview-section"
      onClick={(ev) => {
        ev.stopPropagation()
        navigate(`/board/${board._id}/group/${groupId}/task/${task.id}`)
      }}
    >
      {task.style && <SetCover />}
      {task.labelIds && (
        <SetLabels
          handleLabelClick={handleLabelClick}
          type={labelsPreview}
          board={board}
          task={task}
        />
      )}
      {task.title && <SetTitle type="preview" task={task} />}
      <SetEditBtn onArchiveTask={onArchiveTask} task={task} />
      <SetInfos task={task} />
      <SetMembers type={'preview'} board={board} task={task} />
    </section>
  )
}
