//? Libraries
import { useRef, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
//? Components
import { TaskPreview } from './task-preview'

export function TaskList({
  groupId,
  onArchiveTask,
  group,
  handleLabelClick,
  labelsPreview,
  provided,
}) {
  const taskListRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(taskListRef.current.scrollHeight)
    }

    handleScroll() // Call handleScroll function when the component loads

    taskListRef.current.addEventListener('scroll', handleScroll)

    return () => {
      if (taskListRef.current) {
        taskListRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [taskListRef])

  return (
    <div
      ref={taskListRef}
      className={`task-list-section ${isScrolling ? 'scrolling' : ''}`}
    >
      {group.tasks.map((task, index) => (
        <Draggable key={index} draggableId={task.id} index={index}>
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
