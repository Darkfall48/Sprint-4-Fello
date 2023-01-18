import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { CgClose } from 'react-icons/cg'

export function GroupPreview({ group }) {
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {

  }, [])
  // console.log('group.id', group.id)
  function onAddList(ev) {
    // ev.stopPropogation()
    setEditMode(true)
    console.log('editMode', editMode)

  }
  
  function exitEditMode(ev) {
    // ev.stopPropogation()
    setEditMode(false)
    console.log('editMode', editMode)

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
            <button className='add-group-btn' onClick={onAddList}><BsPlus className="plus" />
              <span> Add another list </span></button>
          </div>
          )}
          {editMode && (
            <div className='add-group-container'>
            <input type="new-group-name" className='new-group-input' placeholder='new list'/>
            <button className='new-group-add-btn' onClick="submit-new-group">Add list</button>
            <button className="close-add-group" onClick={exitEditMode}><CgClose/></button>
          </div>
            )}
        </div>
      )}
    </section>
  )
}
