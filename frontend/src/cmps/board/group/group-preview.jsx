import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useSelector } from 'react-redux'
export function GroupPreview({group, onRemoveGroup}) {
 
  const board = useSelector((storeState) => storeState.boardModule.board)

  if(!group) return <p>WHERE IS MY GROUP??</p>
  return (
    <section className="group-preview-section">
      {/* {group && ( */}
        <div>
          <div className='group-header'>
            <h1 className="group-title">{`${group.title}`}</h1>
            <button onClick={()=>onRemoveGroup(group.id)}><CgClose/></button>
          </div>
          <TaskList groupId={group.id} tasks={group.tasks} />
          <div className="group-bottom-control-btns">
            <button className="add-task-btn">
              <BsPlus className="plus" />
              <span>Add a card</span>
            </button>
            <button name="template" id="template"  className="template-btn">
              <TbTemplate />
            </button>
          </div>
        </div>
      {/* )} */}
    </section>
  )
}
