
import { TodoPreview } from "./todo-preview.jsx"

export function TodoList({ todos, onRemoveTodo, onEditTodo, onDoneTodo }) {
 
    // const [isModalOpen, setIsModalOpen] = useState(false)

    // function onCloseModal() {
    //     setIsModalOpen(!isModalOpen)
    // }

    return <section className="todo-list-container">

        <ul className="todo-list">
            {todos.map((todo, index) =>
                <li className="todo-list-preview" onClick={() => onDoneTodo(todo)} key={index}>
                    <TodoPreview todo={todo} onDoneTodo={onDoneTodo}/>
                    {/* <TodoPreview todo={todo} onDoneTodo={onToggleTodoStatus}/> */}

                    <div className="list-buttons">
                        <button className="delete" onClick={() => { onRemoveTodo(todo.id) }}>X</button>
                        {/* {user && <button onClick={() => { onEditTodo(todo) }}><img src="./assets/img/edit_FILL0_wght400_GRAD0_opsz48.svg" alt="" /></button>} */}
                        {/* {user && <button onClick={() => { setIsModalOpen(!isModalOpen) }}>modal</button>} */}
                    </div>

                </li>)}
        </ul>

        {/* {isModalOpen && <TodoEdit onCloseModal={onCloseModal} />} */}
    </section>
}