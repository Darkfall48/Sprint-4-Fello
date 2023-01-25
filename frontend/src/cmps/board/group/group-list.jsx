//? Libraries
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { BsPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
//? Services
import { showSuccessMsg, showErrorMsg, } from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service.local'
import { updateBoard, loadBoard } from '../../../store/actions/board.actions'
//? Cmps
import { GroupPreview } from './group-preview.jsx'
import { Loader } from '../../helpers/loader'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


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

  async function onAddGroup(ev) {
    if (ev.key !== 'Enter') return
    const newGroup = boardService.getEmptyGroup(newGroupTitle)
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
      navigate('/board') //TODO: Ask Roi why it's not working
      console.log('Board failed to load', err)
      showErrorMsg('Cannot load boards')
    }
  }

  function handeOnDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!result.destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = board.groups[source.droppableId];
    const finish = board.groups[destination.droppableId];

    const items = board.groups
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    const updatedGroups = { ...board, groups: items }

    //  Moving from one list to another
    //  const startTaskIds = Array.from(start.taskIds);
    //  startTaskIds.splice(source.index, 1);
    //  const newStart = {
    //    ...start,
    //    taskIds: startTaskIds,
    //  };
 
    //  const finishTaskIds = Array.from(finish.taskIds);
    //  finishTaskIds.splice(destination.index, 0, draggableId);
    //  const newFinish = {
    //    ...finish,
    //    taskIds: finishTaskIds,
    //  };

    updateBoard(updatedGroups)

  }

  if (!board.groups) return <Loader />
  return (<section className="group-list-section">

    <DragDropContext onDragEnd={handeOnDragEnd}>
      <Droppable droppableId={board._id} direction="horizontal" type="group">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{display: 'flex'}}>
            {board.groups.map((group, index) => (
              <Draggable key={group.id} draggableId={group.id} index={index}>
                {(provided, snapshot) => (
                  <article
                    className="group-preview"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >

                    <div className="group-preview-wrapper">
                      <GroupPreview
                      handleLabelClick= {handleLabelClick}
                      labelsPreview={labelsPreview}
                      group={group}
                      // tasks={tasks}
                        isDragging={snapshot.isDragging}
                        provided={provided}
                        key={group.id} />
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

    <div className='new-group-wrapper'>
      {!editMode && (
        <div className="add-new-group">
          <button className='add-group-btn' onClick={onNewGroupSelect}><BsPlus className="plus" />
            <span> Add another list </span></button>
        </div>)}
    </div>

    {editMode && (
      <div className='add-group-container'
        onBlur={exitEditMode}
      >
        {/* <form action="submit" onSubmit={() => onAddGroup(groupToAdd.title)}> */}
        <input type="text"
          name="title"
          id="title"
          className='new-group-input'
          placeholder='Enter list title...'
          value={newGroupTitle}
          onChange={handleChange}
          onKeyUp={(ev) => onAddGroup(ev, newGroupTitle)}
        />
        <div className='add-item-wrapper'>
          <button className='new-item-add-btn' onClick={() => onAddGroup()}>Add list</button>
          <button className="close-add-item" onClick={exitEditMode}><CgClose /></button>
        </div>
        {/* </form> */}
      </div>
    )}

  </section>
  )
}

