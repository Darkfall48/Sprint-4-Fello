//? Libraries
import { useRef, useState } from 'react'
//? Icons
import { HiOutlineArchive } from 'react-icons/hi'
import { VscEdit } from 'react-icons/vsc'
import { TaskQuickAction } from '../task-quick-action'

export function SetEditBtn({ onArchiveTask, task, groupId, handleLabelClick, labelsPreview }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef()
  const contentRef = useRef(null)



  function closeMenu(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      // updateBoard(board)
      contentRef.current.contentEditable = false
    }
    contentRef.current.contentEditable = true
    setIsMenuOpen(false)
  }

  function onTaskPreviewEdit(ev) {
    ev.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
    console.log('isMenuOpen', isMenuOpen)
  }

  return (
    <article className="task-preview-edit">
      <button ref={buttonRef} 
      className="task-preview-edit-btn" 
      onClick={onTaskPreviewEdit}>
        <VscEdit />
      </button>
      {isMenuOpen && (
        // <div className="task-preview-edit-menu" onBlur={(ev) => closeMenu(ev)}>
        //   <button
        //     className="task-preview-edit-menu-btn"
        //     onClick={(ev) => {
        //       ev.stopPropagation()
        //       onArchiveTask(task.id)
        //     }}
        //   >
        //     <HiOutlineArchive />
        //     <span>Archive</span>
        //   </button>
        // </div>
        <TaskQuickAction
          task={task}
          onArchiveTask={onArchiveTask}
          closeMenu={closeMenu}
          groupId={groupId}
          handleLabelClick={handleLabelClick}
          labelsPreview={labelsPreview}
          buttonRef={buttonRef}
          contentRef={contentRef}
           />
      )
      }
    </article >
  )
}
