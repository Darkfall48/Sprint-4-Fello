import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'

export function GroupPreview({ updatedGroup}) {
  
  return (
    <section className="group-preview-section">
      {/* {group && ( */}
        <div>
          <div className='group-header'>
            <h1 className="group-title">{`${updatedGroup.title}`}</h1>
            <button><BsThreeDots/></button>
          </div>
          <TaskList groupId={updatedGroup.id} tasks={updatedGroup.tasks} />
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
