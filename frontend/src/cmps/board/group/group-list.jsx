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


export function GroupList({ board }) {

  const [editMode, setEditMode] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')

  const navigate = useNavigate()

  function onNewGroupSelect(ev) {
    setEditMode(true)
  }

  function exitEditMode() {
    // ev.stopPropogation()
    setEditMode(false)
    setNewGroupTitle('')
  }

  function handleChange({ target }) {
    let { value } = target
    setNewGroupTitle(value)
  }

  async function onAddGroup(ev) {
    if (ev.key!=='Enter')return
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
      console.log('My error', err)
      showErrorMsg('Cannot load boards')
    }
  }

  if (!board.groups) return <Loader />
  return (<section className="group-list-section">

    {board.groups.map((group) => {
      return <article key={group.id} className="group-preview">
        <div className="group-preview-wrapper">
          <GroupPreview group={group} />
        </div>
      </article>
    })}

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
          onKeyUp={(ev) => onAddGroup(ev,newGroupTitle)}
        />
        <div  className='add-item-wrapper'>
        <button className='new-item-add-btn' onClick={() => onAddGroup(newGroupTitle)}>Add list</button>
        <button className="close-add-item" onClick={exitEditMode}><CgClose /></button>
        </div>
        {/* </form> */}
      </div>
    )}

  </section>
  )
}

