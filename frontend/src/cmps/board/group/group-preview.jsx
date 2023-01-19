import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { useSelector } from 'react-redux'
export function GroupPreview({group}) {
 
  const board = useSelector((storeState) => storeState.boardModule.board)

  console.log('group from preview', group)
  if(!group) return <p>WHERE IS MY GROUP??</p>
  return (
    <section className="group-preview-section">
      {/* {group && ( */}
        <div>
          <div className='group-header'>
            <h1 className="group-title">{`${group.title}`}</h1>
            <button><BsThreeDots/></button>
          </div>
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
      {/* )} */}
    </section>
  )
}
