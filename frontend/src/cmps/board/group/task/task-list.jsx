//? Components
import { TaskPreview } from './task-preview'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { saveGroup } from '../../../../store/actions/board.actions'
import { boardService } from '../../../../services/board/board.service'

export function TaskList({
  groupId,
  onArchiveTask,
  group,
  handleLabelClick,
  labelsPreview,
  provided,
}) {
  // const board = useSelector((storeState) => storeState.boardModule.board)

  return (
    <div className="task-list-section">
      {group.tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              {...provided.droppableProps}
            >
              <TaskPreview
                labelsPreview={labelsPreview}
                handleLabelClick={handleLabelClick}
                key={task.id}
                groupId={groupId}
                group={group}
                task={task}
                onArchiveTask={onArchiveTask}
                mode={'task-list'}
              />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )
}

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
