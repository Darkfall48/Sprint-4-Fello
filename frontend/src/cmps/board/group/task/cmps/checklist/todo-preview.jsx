import { updateTask } from '../../../../../../store/actions/board.actions'

export function TodoPreview({ todo, onDoneTodo }) {
  return (
    <section className="task-details-main-checklist-todos-list-todo-title">
      {/* <input
            defaultChecked={todo.isDone ? true : false}
            type='checkbox'
            name='isDone'
            // onClick={() => onDoneTodo(todo)}
        /> */}
      <p className={todo.isDone ? ' done' : ''}>{todo.title}</p>
    </section>
  )
}
