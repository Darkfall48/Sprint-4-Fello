import { useEffect, useState } from 'react'

import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useSelector } from 'react-redux'
//?Services
import {boardService} from '../../../services/board/board.service.local'
import { loadBoard, updateBoard } from '../../../store/actions/board.actions'

export function GroupPreview({group, onRemoveGroup, }) {
 
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [editMode, setEditMode] = useState(false)
  const [newTask, setNewTask] = useState(boardService.getEmptyTask(''))
  
  function onAddTask(){
    setEditMode(true)
  }

  function handleChange({ target }) {
    let { value } = target
    setNewTask((prevTask)=>({...prevTask,title:value}))
    console.log('newTask', newTask)
  }

  async function onSubmitTask(e){
    e.preventDefault()
    e.stopPropagation()
    // if (e.key !== 'Enter' || e.keyCode !== 13) return
    console.log('submitted!')
    const tasks = group.tasks.concat(newTask)
    console.log('group.tasks', tasks)
    const updatedGroup = { ...group, tasks }
    const groupChangedIdx = board.groups.findIndex(group=>group.id===updatedGroup.id)
    console.log('groupChangedIdx', groupChangedIdx)
    const groups = board.groups.splice(groupChangedIdx,1,updatedGroup)
    console.log('groups', groups)
    const updatedBoard = { ...board, groups}
    console.log('updatedBoard', updatedBoard)
    try {
      // await updateBoard(updatedBoard)
      // loadBoard()
    //   setNewTask('')
      // showSuccessMsg('Task saved!')
    } catch (err) {
      console.log('err', err)
      // showErrorMsg('Cannot save task')
    }  
  }

  return (
    <section className="group-preview-section">
      {/* {group && ( */}
        <div>
          <div className='group-header'>
            <h1 className="group-title">{`${group.title}`}</h1>
            <button onClick={()=>onRemoveGroup(group.id)}><CgClose/></button>
          </div>
          <TaskList groupId={group.id} tasks={group.tasks} />
          {editMode && (
          <article className="task-preview-section add-tesk-edit"  onKeyUp={onSubmitTask}>
            <input type="text" className='add-task-textarea' placeholder='Enter a title for this card...' onChange={handleChange} />
            {/* <button onClick={onSubmitTask}></button> */}
          </article>
          )}
          <div className="group-bottom-control-btns">
            <button onClick={onAddTask} className="add-task-btn">
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
