export function SetChecklist({ task, checklist }) {
  console.log('Checkyyy', checklist)

  const numChecklists = task.checklists.length
  const root = document.documentElement
  root.style.setProperty('--num-checklists', numChecklists)

  return (
    <section className="task-details-section-checklist">
      {checklist.todos.map((todo, idx) => (
        <div key={todo.id + idx}>{todo.title}</div>
      ))}
    </section>
  )
}
