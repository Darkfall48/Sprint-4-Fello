//? Components
import { useState } from 'react'
import { TaskPreview } from './task-preview'
import { FaAccusoft } from 'react-icons/fa'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { saveGroup, updateBoard, updateTask } from '../../../../store/actions/board.actions'
import { boardService } from '../../../../services/board/board.service.local'

export function TaskList({ groupId, tasks, onArchiveTask, group }) {

  const board = useSelector((storeState) => storeState.boardModule.board)

  // console.log('group', group);

  // function getCurrTasks(){
  //   const tasksArray = []
  //   const currGroup = board.groups.map(group => group.tasks)
  //   console.log('currGroup', currGroup);
  //   const currTasks = currGroup.map(task => task)
  //   console.log('currTasks', currTasks);
  //   const currTask = currTasks.map(task => {
  //     task.map(item => {
  //       tasksArray.push(item)
  //     })

  //   })
  //   return tasksArray
  // }

  // console.log('tasks', tasks);

  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!result.destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // const start = this.state.columns[source.droppableId];
    // const finish = this.state.columns[destination.droppableId];

    const items = group.tasks
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    const updatedGroup = { ...group, tasks: items }

    saveGroup(updatedGroup)

  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={groupId} type="task">
        {(provided) => (
          <div className="task-list-section" ref={provided.innerRef} {...provided.droppableProps}>
            {group.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskPreview key={task.id} groupId={groupId} task={task} onArchiveTask={onArchiveTask} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )

  // return (
  //   <section className="task-list-section">
  //     {tasks.map((task) => (
  //       <TaskPreview key={task.id} groupId={groupId} task={task} onArchiveTask={onArchiveTask}/>
  //     ))}
  //   </section>
  // )
}

