import { updateTask } from "../../../../../../store/actions/board.actions"

export function TodoPreview({ todo, onDoneTodo }) {

    return <section className="todo-preview">
        <p className={todo.isDone ? ' done' : ''}>{todo.title}</p>
    </section>
}