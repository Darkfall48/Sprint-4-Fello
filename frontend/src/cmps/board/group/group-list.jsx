//? Libraries
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { BsPlus } from 'react-icons/bs'
//? Services
import { showSuccessMsg, showErrorMsg, } from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service.local'
import { loadBoards, updateBoard } from '../../../store/actions/board.actions'
//? Cmps
import { GroupPreview } from './group-preview.jsx'

export function GroupList({ board }) {
  // const [board, setBoard] = useState(board)
  const [updatedGroups, setUpdatedGroups] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [groupToAdd, setGroupToAdd] = useState({ title: '' })

  function onNewGroupSelect(ev) {
    setEditMode(true)
    console.log('editMode', editMode)
  }

  function exitEditMode(ev) {
    ev.stopPropogation()
    setEditMode(false)
    console.log('editMode', editMode)

  }

  function handleChange({ target }) {
    let { value, type, name: field, } = target
    console.log(value);
    value = type === 'number' ? +value : value
    setGroupToAdd((prevGroup) => ({ ...prevGroup, [field]: value }))
  }

  useEffect(() => {
    loadGroups()
  }, [])

  async function loadGroups() {
    try {
      // const board = await boardService.get(params.boardId)
      setUpdatedGroups(board.groups)
      // .push({
      //   id:9999,
      //   title: '',
      //   tasks: [],
      // }))

      // setGroups(board.groups.push(boardService.getEmptyGroup()))
      showSuccessMsg('Groups loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }

  // async function loadBoard(){
  //  try{
  //   boards =
  //  }
  // }

  // async function onRemoveGroup(groupId) {
  //   try {
  //     await removeGroup(groupId)
  //     showSuccessMsg('Group removed')
  //   } catch (err) {
  //     showErrorMsg('Cannot remove group')
  //   }
  // }

  // async function onAddGroup() {
  //   const group = boardService.getEmptyGroup()
  //   group.vendor = prompt('Vendor?')
  //   try {
  //     const savedGroup = await addGroup(group)
  //     showSuccessMsg(`Group added (id: ${savedGroup._id})`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add group')
  //   }
  // }

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

  // function onAddGroupMsg(group) {
  //   console.log(`TODO Adding msg to group`)
  // }
  async function onAddGroup(groupToAddTitle) {
    console.log('groupToAddTitle', groupToAddTitle)
    try {
      const newGroup = boardService.getEmptyGroup(groupToAddTitle)
      setUpdatedGroups(updatedGroups.push(newGroup))
      console.log('updatedGroups', updatedGroups)
      const updatedBoard = { ...board, groups: updatedGroups }
      updateBoard(updatedBoard)
      showSuccessMsg('Group saved!')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save toy')
    }
  }


  if (!updatedGroups) return <p>loading...</p>
  return (
    <section className="group-list-section">
      {updatedGroups.map((updatedGroup) => (
        <article key={updatedGroup.id} className="group-preview">
          <div className="group-preview-wrapper">
            <GroupPreview updatedGroup={updatedGroup} />
            {/* <button onClick={() => { onRemoveGroup(group._id)}}> x </button> */}
            {/* <button onClick={() => { onUpdateGroup(group) }}> Edit </button> */}
          </div>
        </article>
      ))}
      <div className='new-group-wrapper'>
        {!editMode && (
          <div className="add-new-group">
            <button className='add-group-btn' onClick={onNewGroupSelect}><BsPlus className="plus" />
              <span> Add another list </span></button>
          </div>
        )}
        {editMode && (
          <div className='add-group-container'>
            {/* <form action="submit" onSubmit={() => onAddGroup(groupToAdd.title)}> */}
            <input type="text" name="title" id="title" className='new-group-input' placeholder='Enter list title...' value={groupToAdd.title} onChange={handleChange} />
            <button className='new-group-add-btn' onClick={() => onAddGroup(groupToAdd.title)}>Add list</button>
            <button className="close-add-group" onClick={exitEditMode}><CgClose /></button>
            {/* </form> */}
          </div>
        )}
      </div>
      {/* <GroupPreview group={null} /> */}
    </section>
  )
}

