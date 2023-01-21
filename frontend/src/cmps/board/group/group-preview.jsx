import { useState, useRef } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useSelector } from 'react-redux'
//?Services
import { boardService } from '../../../services/board/board.service.local'
import { removeTask, addTask, updateBoard } from '../../../store/actions/board.actions'
import { store } from '../../../store/store'


export function GroupPreview({ group, onRemoveGroup }) {

  const board = useSelector((storeState) => storeState.boardModule.board)

  const contentRef = useRef(null)

  const [editMode, setEditMode] = useState(false)
  const [newTask, setNewTask] = useState(boardService.getEmptyTask(''))

  function onAddTask() {
    setEditMode(true)
  }

  function handleChange({ target }) {
    let { name, value } = target
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }))
    console.log('newTask', newTask)
  }

  async function onSubmitTask(e) {
    e.preventDefault()
    addTask(group, newTask)
    setNewTask(boardService.getEmptyTask(''))
    setEditMode(false)
  }

  function onArchiveTask(taskId, ev) {
    // ev.preventDefault()
    // ev.stopPropogation()
    console.log('taskId', taskId)
    removeTask(group, taskId)
  }

  function changeContent(ev) {
    board.title = contentRef.current.innerText

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      updateBoard(board)
      contentRef.current.contentEditable = false
    }
    contentRef.current.contentEditable = true
  }


  return (
    <section className="group-preview-section">
      {/* {group && ( */}
      <div>
        <div className='group-header'>
          <h1 className="group-title"
            ref={contentRef}
            style={{ wordBreak: 'keep-all' }}
            onKeyDown={(ev) => changeContent(ev)}
            onBlur={(ev) => changeContent(ev)}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {`${group.title}`}
          </h1>
          <button onClick={() => onRemoveGroup(group.id)}><CgClose /></button>
        </div>
        <div className='group-section'>
          <TaskList groupId={group.id} tasks={group.tasks} onArchiveTask={onArchiveTask} />
          {editMode && (
            <form className="task-preview-section add-tesk-edit"
              onSubmit={onSubmitTask}
              onBlur={(ev) => onSubmitTask(ev)}
            >
              <input type="text"
                name='title'
                className='add-task-textarea'
                placeholder='Enter a title for this card...'
                value={newTask.title}
                onChange={handleChange}
              />
            </form>
          )}
          <div className="group-bottom-control-btns">
            <button onClick={onAddTask} className="add-task-btn">
              <BsPlus className="plus" />
              <span>Add a card</span>
            </button>
            <button name="template" id="template" className="template-btn">
              <TbTemplate />
            </button>
          </div>
        </div>
      </div>
      {/* )} */}
    </section>
  )
}
