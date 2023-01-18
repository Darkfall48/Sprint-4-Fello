import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'

export function GroupPreview({ group }) {
  const [editMode, setEditMode] = useState(false)

  useEffect(()=>{

  },[])
  // console.log('group.id', group.id)
  function onAddList(ev){
    // ev.stopPropogation()
    console.log('editMode', editMode)
    toggleEditMode()
  }

  function toggleEditMode(){
    setEditMode(!editMode)
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
        
        <button className='add-group-btn' onClick={onAddList}><BsPlus className="plus" />
        <span> Add another list </span></button>
      )}
    </section>
  )
}
