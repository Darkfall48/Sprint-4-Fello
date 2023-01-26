//?Libraries
import { useState, useRef } from 'react'
import { TaskList } from './task/task-list'
import { HiOutlinePlus } from 'react-icons/hi'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useSelector } from 'react-redux'
//?Services
import { boardService } from '../../../services/board/board.service'
import {
  removeTask,
  addTask,
  updateBoard,
} from '../../../store/actions/board.actions'
//?Componenets
import { Modal } from '../../app/modal'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export function GroupPreview({
  group,
  handleLabelClick,
  labelsPreview,
  provided,
  board,
  isDragging,
}) {
  // const board = useSelector((storeState) => storeState.boardModule.board)
  const contentRef = useRef(null)

  const [editMode, setEditMode] = useState(false)
  const [newTask, setNewTask] = useState(boardService.getEmptyTask(''))
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false)

  function onAddTask() {
    setEditMode(true)
  }

  function handleChange(ev) {
    if (ev.key === 'Enter') onSubmitTask(ev)
    const { target } = ev
    let { name, value } = target
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }))
  }

  function exitEditMode(e) {
    e.preventDefault()
    setEditMode(false)
  }

  async function onSubmitTask(ev) {
    console.log('newTask', newTask)
    if (newTask.title === '') return
    ev.preventDefault()
    try{
      await addTask(group, newTask)
      setNewTask(boardService.getEmptyTask(''))
      setEditMode(false)
    } catch(err){
      console.log('Failed to add Task', err)
    }
  }

  function onArchiveTask(taskId) {
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

  function onCloseModal() {
    setIsGroupMenuOpen(false)
  }

  return (
    <Droppable droppableId={group.id} direction="vertical" type="task">
      {(prov) => (
        <section
          className="group-preview-section"
          ref={prov.innerRef}
          {...provided.dragHandleProps}
        >
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
            <button
              onClick={() => onGroupMenuOpen(group.id)}
              className="group-edit-menu-btn"
            >
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
            handleLabelClick={handleLabelClick}
            labelsPreview={labelsPreview}
            groupId={group.id}
            tasks={group.tasks}
            onArchiveTask={onArchiveTask}
            group={group}
            provided={provided}
            boardId={board._id}
          />
          {editMode && (
            <form onSubmit={onSubmitTask} onBlur={(ev) => onSubmitTask(ev)}>
              <textarea
                type="text"
                name="title"
                className="task-preview-section add-task-edit"
                placeholder="Enter a title for this card..."
                value={newTask.title}
                onChange={handleChange}
                onKeyUp={handleChange}
              />
              <div className="add-item-wrapper">
                <button
                  className="new-item-add-btn"
                  onClick={() => onSubmitTask()}
                >
                  Add card
                </button>
                <button
                  type="button"
                  className="close-add-item"
                  onClick={exitEditMode}
                >
                  <CgClose />
                </button>
              </div>
            </form>
          )}
          {!editMode && (
            <div className="group-bottom-control-btns">
              <button onClick={onAddTask} className="add-task-btn">
                <HiOutlinePlus className="plus" />
                <span>Add a card</span>
              </button>
              <button name="template" className="template-btn">
                <TbTemplate />
              </button>
            </div>
          )}
        </section>
      )}
    </Droppable>
  )
}
