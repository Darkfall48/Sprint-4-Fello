//? Libraries
import { useRef, useState } from 'react'
//? Icons
import { HiOutlineArchive } from 'react-icons/hi'
import { VscEdit } from 'react-icons/vsc'
import { TaskQuickAction } from '../task-quick-action'

export function SetEditBtn({ onArchiveTask, task, groupId, handleLabelClick, labelsPreview }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function onTaskPreviewEdit(ev) {
    ev.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <article className="task-preview-edit">
      <button ref={buttonRef} 
      className="task-preview-edit-btn" 
      onClick={onTaskPreviewEdit}>
        <VscEdit />
      </button>
      {isMenuOpen && (
        <TaskQuickAction
          task={task}
          onArchiveTask={onArchiveTask}
          closeMenu={closeMenu}
          groupId={groupId}
          handleLabelClick={handleLabelClick}
          labelsPreview={labelsPreview}
          buttonRef={buttonRef}
          isMenuOpen={isMenuOpen}
           />
      )
      }
    </article >
  )
}
