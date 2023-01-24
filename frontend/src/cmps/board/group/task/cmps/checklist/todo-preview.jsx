import { updateTask } from "../../../../../../store/actions/board.actions"

export function TodoPreview({ todo, onDoneTodo }) {

    return <section className="todo-preview">
        {/* <input
            defaultChecked={todo.isDone ? true : false}
            type='checkbox'
            name='isDone'
            // onClick={() => onDoneTodo(todo)}
        /> */}
        <p className={todo.isDone ? ' done' : ''}>{todo.title}</p>
    </section>
}