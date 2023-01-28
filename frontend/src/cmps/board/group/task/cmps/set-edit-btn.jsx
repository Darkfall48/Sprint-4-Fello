//? Libraries
import { useRef, useState } from 'react'
//? Icons
import { HiOutlineArchive } from 'react-icons/hi'
import { VscEdit } from 'react-icons/vsc'
import { TaskQuickAction } from '../task-quick-action'

export function SetEditBtn({ onArchiveTask, task, groupId, handleLabelClick, labelsPreview, boardId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef()
console.log('isMenuOpen', isMenuOpen)
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
          boardId={boardId}
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
