//? Components
import { useState } from 'react'
import { TaskPreview } from './task-preview'

export function TaskList({groupId, tasks}) {

  console.log('tasks', tasks)
  console.log('groupId', groupId)
  const [tsks, setTasks] = useState([
    {
      id: 'c103',
      title: 'Do that',
      archivedAt: 1589983468418,
    },
    // add more tasks here
  ])

  return (
    <section className="task-list-section">
      <h1>Hello from Task List</h1>
      <ul className="task-list-container">
        {tsks.map((task) => (
          <li className="task-preview" key={task.id}>
            <TaskPreview task={task} />
          </li>
        ))}
      </ul>
    </section>
  )
}
