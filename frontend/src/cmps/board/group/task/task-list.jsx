//? Components
import { useState } from 'react'
import { TaskPreview } from './task-preview'
import { FaAccusoft } from 'react-icons/fa'

export function TaskList({ groupId, tasks }) {
  return (
    <section className="task-list-section">
      {tasks.map((task) => (
        <TaskPreview key={task.id} task={task} />
      ))}
    </section>
  )
}