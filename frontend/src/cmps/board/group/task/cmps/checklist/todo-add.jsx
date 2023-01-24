import { useEffect, useRef, useState } from "react"
import { boardService } from "../../../../../../services/board/board.service.local"
import { updateTask } from "../../../../../../store/actions/board.actions";

export function TodoAdd({ group, task, checklist, onCloseModal }) {

    const [todoToAdd, setTodoToAdd] = useState(boardService.getEmptyTodo())
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        setTodoToAdd((prevTodo) => {
            return { ...prevTodo, [field]: value }
        })
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        if (inputRef.current.value === '') return

        const { todos } = checklist
        todos.push(todoToAdd)

        updateTask(group, task)
        inputRef.current.value = ''
    }

    return <section className="todo-add">

        <form onSubmit={(ev) => onAddTodo(ev)} >

            <textarea
                name="title"
                id="title"
                cols="30"
                rows="10"
                placeholder="Add an item"
                value={todoToAdd.title}
                onChange={handleChange}
                ref={inputRef}
                // onBlur={() => onCloseModal()}
                style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '56px' }}
            >
            </textarea>

            <div className="todo-btns">
                <button className="todo-btn">Add</button>
                <button className="cancel-btn" onClick={() => onCloseModal()}>Cancel</button>
            </div>

        </form>
    </section>

}