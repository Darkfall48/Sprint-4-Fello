//? Components
import { useState } from 'react'
import { TaskPreview } from './task-preview'
import { FaAccusoft } from 'react-icons/fa'

export function TaskList({ groupId, tasks, onArchiveTask }) {
  return (
    <section className="task-list-section">
      {tasks.map((task) => (
        <TaskPreview key={task.id} groupId={groupId} task={task} onArchiveTask={onArchiveTask}/>
      ))}
    </section>
  )
}
