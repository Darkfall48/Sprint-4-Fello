import { useState, useRef } from 'react'

import { TaskList } from './task/task-list'
import { HiOutlinePlus } from 'react-icons/hi'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useSelector } from 'react-redux'
//?Services
import { boardService } from '../../../services/board/board.service.local'
import {
  removeTask,
  addTask,
  updateBoard,
} from '../../../store/actions/board.actions'
import { store } from '../../../store/store'
import { Modal } from '../../app/modal'

export function GroupPreview({ group }) {
  const board = useSelector((storeState) => storeState.boardModule.board)

  const contentRef = useRef(null)

  const [editMode, setEditMode] = useState(false)
  const [newTask, setNewTask] = useState(boardService.getEmptyTask(''))
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false)

  function onAddTask() {
    setEditMode(true)
  }

  function handleChange({ target }) {
    let { name, value } = target
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }))
    console.log('newTask', newTask)
  }

  function exitEditMode() {
    setEditMode(false)
  }

  async function onSubmitTask(e) {
    e.preventDefault()
    addTask(group, newTask)
    setNewTask(boardService.getEmptyTask(''))
    setEditMode(false)
  }

  function onArchiveTask(taskId) {
    // console.log('ev', ev)
    // ev.preventDefault()
    // ev.stopImmediatePropagation()
    console.log('taskId', taskId)
    removeTask(group, taskId)
  }

  function changeContent(ev) {
    group.title = contentRef.current.innerText

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      updateBoard(board)
      contentRef.current.contentEditable = false
    }
    contentRef.current.contentEditable = true
  }

  function onGroupMenuOpen() {
    setIsGroupMenuOpen(true)
  }

  function onCloseModal(ev) {
    ev.preventDefault()
    setIsGroupMenuOpen(false)
  }

  return (
    <section className="group-preview-section">
      <div>
        <div className="group-header">
          <h1
            className="group-title"
            ref={contentRef}
            style={{ wordBreak: 'keep-all' }}
            onKeyDown={(ev) => changeContent(ev)}
            onBlur={(ev) => changeContent(ev)}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {`${group.title}`}
          </h1>
          <button onClick={() => onGroupMenuOpen(group.id)}>
            <BsThreeDots />
          </button>
          {isGroupMenuOpen && (
            <Modal
              type="group-actions"
              modalTitle="List Actions"
              onCloseModal={onCloseModal}
              group={group}
              onAddTask={onAddTask}
            />
          )}
        </div>
        <TaskList
          groupId={group.id}
          tasks={group.tasks}
          onArchiveTask={onArchiveTask}
        />
        {editMode && (
          <form
            className="task-preview-section add-task-edit"
            onSubmit={onSubmitTask}
            onBlur={(ev) => onSubmitTask(ev)}
          >
            <input
              type="text"
              name="title"
              className="add-task-textarea"
              placeholder="Enter a title for this card..."
              value={newTask.title}
              onChange={handleChange}
            />
            {/* <button className='new-group-add-btn' onClick={() => onSubmitTask()}>Add task</button>
            <button className="close-add-group" onClick={exitEditMode}><CgClose /></button> */}
          </form>
        )}
        <div className="group-bottom-control-btns">
          <button onClick={onAddTask} className="add-task-btn">
            <HiOutlinePlus className="plus" />
            <span>Add a card</span>
          </button>
          <button name="template" className="template-btn">
            <TbTemplate />
          </button>
        </div>
      </div>
    </section>
  )
}
