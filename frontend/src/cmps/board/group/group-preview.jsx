import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { CgClose } from 'react-icons/cg'

export function GroupPreview({ group }) {
  const [editMode, setEditMode] = useState(false)
  const [groupToAdd, setGroupToAdd] = useState({ title: '' })

  useEffect(() => {

  }, [])
  // console.log('group.id', group.id)
  function onNewGroupSelect(ev) {
    setEditMode(true)
    console.log('editMode', editMode)

  }

  function exitEditMode(ev) {
    // ev.stopPropogation()
    setEditMode(false)
    console.log('editMode', editMode)

  }

  function handleChange({ target }) {
    let { value, type, name: field, } = target
    console.log(value);
    value = type === 'number' ? +value : value
    setGroupToAdd((prevGroup) => ({ ...prevGroup, [field]: value }))
  }

  async function onAddGroup(ev) {
    ev.preventDefault()
    // try {
    //  const groupAdded=  await saveToy(groupToAdd)
    //   showSuccessMsg('Toy saved!')
    //   navigate('/toy')
    // } catch (err) {
    //   console.log('err', err)
    //   showErrorMsg('Cannot save toy')
    // }
  }

  return (
    <section className="group-preview-section">
      {group && (
        <div>
          <h1 className="group-title">{`${group.title}`}</h1>
          <TaskList groupId={group.id} tasks={group.tasks} />
          <div className="group-bottom-control-btns">
            <button className="add-task-btn">
              <BsPlus className="plus" />
              <span>Add a card</span>
            </button>
            <a name="template" id="template">
              <TbTemplate className="template-btn" />
            </a>
          </div>
        </div>
      )}
      {!group && (
        <div className='new-group-wrapper'>
          {!editMode && (
            <div className="add-new-group">
              <button className='add-group-btn' onClick={onNewGroupSelect}><BsPlus className="plus" />
                <span> Add another list </span></button>
            </div>
          )}
          {editMode && (
            <div className='add-group-container'>
              <form action="submit" onSubmit={onAddGroup}>
                <input type="text" name="title" id="title" className='new-group-input' placeholder='Enter list title...' value={groupToAdd.title} onChange={handleChange} />
                <button className='new-group-add-btn'>Add list</button>
                <button className="close-add-group" onClick={exitEditMode}><CgClose /></button>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
