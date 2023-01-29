//? Libraries
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { BsPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
//? Services
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/connection/event-bus.service'
import { groupService } from '../../../services/board/group.service'
import { boardService } from '../../../services/board/board.service'
import {
  updateBoard,
  loadBoard,
  saveGroup,
} from '../../../store/actions/board.actions'
//? Cmps
import { GroupPreview } from './group-preview.jsx'
import { Loader } from '../../helpers/loader'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { dndService } from '../../../services/dnd.service'

export function GroupList({ board }) {
  const [labelsPreview, setLabelsPreview] = useState('preview-simple')
  const [editMode, setEditMode] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')

  function handleLabelClick() {
    // TODO: When state change: re-render board
    setLabelsPreview(
      labelsPreview === 'preview-simple' ? 'preview-detailed' : 'preview-simple'
    )
  }

  const navigate = useNavigate()

  function onNewGroupSelect(ev) {
    setEditMode(true)
  }

  function exitEditMode() {
    setEditMode(false)
    setNewGroupTitle('')
  }

  function handleChange({ target }) {
    let { value } = target
    setNewGroupTitle(value)
  }

  async function onAddGroup(ev = null) {
    console.log('ev', ev.key)
    if (ev.key !== 'Enter' && ev.key !== null) return
    const newGroup = groupService.getEmptyGroup(newGroupTitle)
    const groups = board.groups.concat(newGroup)
    const updatedBoard = { ...board, groups }
    try {
      await updateBoard(updatedBoard)
      onLoadBoard()
      setNewGroupTitle('')
      setEditMode(false)
      showSuccessMsg('Group saved!')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save group')
    }
  }

  async function onLoadBoard() {
    try {
      await loadBoard(board._id)
      showSuccessMsg('Boards loaded')
    } catch (err) {
      navigate('/board') //! Not working !
      console.log('Board failed to load', err)
      showErrorMsg('Cannot load boards')
    }
  }

  function handleOnDragEnd({ source, destination, type }) {
    if (!destination) return
    const { droppableId: destinationId, index: destinationIdx } = destination
    const { droppableId: sourceId, index: sourceIdx } = source

    if (type === 'task') {
      const sourceGroups = groupService.getGroupById(board, destinationId)
      console.log('sourceGroups', sourceGroups)
      const destinationGroups = groupService.getGroupById(board, sourceId)
      const tasks = sourceGroups.tasks

      if (sourceId === destinationId) {
        sourceGroups.tasks = dndService.reorder(
          tasks,
          sourceIdx,
          destinationIdx
        )
      } else {
        sourceGroups.tasks = dndService.swapItemBetweenLists(
          destinationGroups,
          sourceGroups,
          sourceIdx,
          destinationIdx
        )
      }
    } else if (type === 'group') {
      board.groups = dndService.reorder(board.groups, sourceIdx, destinationIdx)
    }
    updateBoard(board)
  }

  if (!board.groups) return <Loader />
  return (
    <section className="group-list-section">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={board._id} direction="horizontal" type="group">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={{ display: 'flex' }}>
              {board.groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided, snapshot) => (
                    <article
                      className="group-preview"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                    >
                      <div className="group-preview-wrapper">
                        <GroupPreview
                          handleLabelClick={handleLabelClick}
                          labelsPreview={labelsPreview}
                          group={group}
                          board={board}
                          index={index}
                          isDragging={
                            snapshot.isDragging && !snapshot.isDropAnimating
                          }
                          provided={provided}
                          key={group.id}
                        />
                      </div>
                    </article>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="new-group-wrapper">
        {!editMode && (
          <div className="add-new-group">
            <button className="add-group-btn" onClick={onNewGroupSelect}>
              <BsPlus
                className="plus"
                style={
                  board?.style?.isLight
                    ? { color: '#172B4D ' }
                    : { color: 'white' }
                }
              />
              <span
                style={
                  board?.style?.isLight
                    ? { color: '#172B4D ' }
                    : { color: 'white' }
                }
              >
                Add another list
              </span>
            </button>
          </div>
        )}
      </div>

      {editMode && (
        <div className="add-group-container" onBlur={exitEditMode}>
          {/* <form action="submit" onSubmit={() => onAddGroup(groupToAdd.title)}> */}
          <input
            type="text"
            name="title"
            id="title"
            className="new-group-input"
            placeholder="Enter list title..."
            value={newGroupTitle}
            onChange={handleChange}
            onKeyUp={(ev) => onAddGroup(ev, newGroupTitle)}
          />
          <div className="add-item-wrapper">
            <button
              className="new-item-add-btn"
              onClick={(ev) => onAddGroup(ev)}
            >
              Add list
            </button>
            <button className="close-add-item" onClick={exitEditMode}>
              <CgClose />
            </button>
          </div>
          {/* </form> */}
        </div>
      )}
    </section>
  )
}
