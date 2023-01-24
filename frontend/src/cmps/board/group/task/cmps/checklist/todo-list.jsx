
import { useState } from "react"
import { TodoEdit } from "./todo-edit.jsx"
import { TodoPreview } from "./todo-preview.jsx"

export function TodoList({ todos, onRemoveTodo, onEditTodo, onDoneTodo }) {

    const [istodoEditable, setIstodoEditable] = useState(false)

    function onCloseModal() {
        setIstodoEditable(!istodoEditable)
    }

    return <section className="todo-list-container">

        <ul className="todo-list">
            {todos.map((todo, index) =>
                <li className="todo-list-preview" onClick={() => setIstodoEditable(!istodoEditable) } key={index}>
                    <div className="check-todo">
                    <input
                        defaultChecked={todo.isDone}
                        type='checkbox'
                        name='isDone'
                        onClick={() => onDoneTodo(todo)}
                    />
                    <TodoPreview todo={todo} onDoneTodo={onDoneTodo} />
                    </div>

                    <div className="list-buttons">
                        <button className="delete" onClick={() => { onRemoveTodo(todo.id) }}>X</button>
                        {/* {istodoEditable && <TodoEdit onCloseModal={onCloseModal} todo={todo} onEditTodo={onEditTodo}/>} */}
                    </div>

                </li>)}
        </ul>

    </section>
}