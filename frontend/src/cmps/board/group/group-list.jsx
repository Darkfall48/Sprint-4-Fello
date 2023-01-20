//? Libraries
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { BsPlus } from 'react-icons/bs'

//? Services
import { showSuccessMsg, showErrorMsg, } from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service.local'
import { updateBoard } from '../../../store/actions/board.actions'
import { store } from '../../../store/store'

//? Cmps
import { GroupPreview } from './group-preview.jsx'
import { Loader } from '../../helpers/loader'

export function GroupList({ board, onLoadBoard }) {

  const [editMode, setEditMode] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')

  function onNewGroupSelect(ev) {
    setEditMode(true)
    console.log('editMode', editMode)
  }

  function exitEditMode() {
    // ev.stopPropogation()
    setEditMode(false)
    console.log('editMode', editMode)
  }

  function handleChange({ target }) {
    let { value } = target
    setNewGroupTitle(value)
  }

  async function onAddGroup(newGroupTitle) {
    const newGroup = boardService.getEmptyGroup(newGroupTitle)
    const groups = board.groups.concat(newGroup)
    const updatedBoard = { ...board, groups }
    try {
      await updateBoard(updatedBoard)
      loadBoard()
      setNewGroupTitle('')
      setEditMode(false)
      showSuccessMsg('Group saved!')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save group')
    }
  }

  async function onRemoveGroup(groupId) {
    const updatedGroups = board.groups.filter((group) => group.id !== groupId)
    const updatedBoard = { ...board, groups: updatedGroups }
    console.log('newBoard', updatedBoard)
    try {
      await updateBoard(updatedBoard)
      loadBoard()
      showSuccessMsg('Group removed')
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  function loadBoard() {
    onLoadBoard()
    store.dispatch({ type: 'CLEAN_STORE' })
  }


  if (!board.groups) return <Loader />
  return (<section className="group-list-section">

    {board.groups.map((group) => {
      return <article key={group.id} className="group-preview">
        <div className="group-preview-wrapper">
          <GroupPreview group={group} onRemoveGroup={onRemoveGroup} />
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
      <div className='add-group-container' >
        {/* <form action="submit" onSubmit={() => onAddGroup(groupToAdd.title)}> */}
        <input type="text"
          name="title"
          id="title"
          className='new-group-input'
          placeholder='Enter list title...'
          value={newGroupTitle}
          onChange={handleChange}
        />
        <button className='new-group-add-btn' onClick={() => onAddGroup(newGroupTitle)}>Add list</button>
        <button className="close-add-group" onClick={exitEditMode}><CgClose /></button>
        {/* </form> */}
      </div>
    )}

  </section>
  )
}


    // async function onUpdateGroup(group) {
    //   const price = +prompt('New price?')
    //   const groupToSave = { ...group, price }
    //   try {
    //     const savedGroup = await updateGroup(groupToSave)
    //     showSuccessMsg(`Group updated, new price: ${savedGroup.price}`)
    //   } catch (err) {
    //     showErrorMsg('Cannot update group')
    //   }
    // }
