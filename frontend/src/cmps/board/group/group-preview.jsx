import { TaskList } from "./task/task-list";

export function GroupPreview({group}) {
  return (
    <section className="group-preview-section">
      <h1 className="group-title">{`${group.title}`}</h1>
      <TaskList groupId={group.id} tasks={group.tasks}/>
      <button>+ Add a card</button>
      <select name="template" id="template"></select>
    </section>
  )
}
