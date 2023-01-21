//? Libraries
import { useState } from 'react'
//? Icons
import { HiOutlineArchive } from 'react-icons/hi'
import { VscEdit } from 'react-icons/vsc'

export function SetEditBtn({ onArchiveTask, task }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu(ev) {
    setIsMenuOpen(false)
  }

  function onTaskPreviewEdit(ev) {
    ev.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <article className="task-preview-edit">
      <button className="task-preview-edit-btn" onClick={onTaskPreviewEdit}>
        <VscEdit />
      </button>
      {isMenuOpen && (
        <div className="task-preview-edit-menu" onBlur={(ev) => closeMenu(ev)}>
          <button
            className="task-preview-edit-menu-btn"
            onClick={(ev) => onArchiveTask(task.id, ev)}
          >
            <HiOutlineArchive />
            <span>Archive</span>
          </button>
        </div>
      )}
    </article>
  )
}