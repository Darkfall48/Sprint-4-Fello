import { useEffect, useRef, useState } from "react"
import { boardService } from "../../../../../../services/board/board.service.local"
import { updateTask } from "../../../../../../store/actions/board.actions";

export function TodoAdd({ group, task, checklist, onCloseModal }) {

    // const user = useSelector((storeState => storeState.userModule.user))

    const [todoToAdd, setTodoToAdd] = useState(boardService.getEmptyTodo())
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])


    function handleChange({ target }) {
        let { value, name: field } = target
        console.log('value', value);
        setTodoToAdd((prevTodo) => {
            return { ...prevTodo, [field]: value }
        })
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        console.log('ev', ev);
        if (inputRef.current.value === '') return
        const { checklists } = task

        const checklist = checklists.find(checklist => {
            const checklistId = checklist.id
            if (checklistId === checklist.id) return checklist
        })

        const { todos } = checklist
        todos.push(todoToAdd)

        // const updatedTask = { ...task, ...checklists, ...todos, todo: todoToAdd }
        // console.log('updatedTask', task);
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

            {/* <input type="text"
                id="title"
                name="title"
                placeholder="Add an item"
                value={todoToAdd.title}
                onChange={handleChange}
                ref={inputRef}
                style={{ height: '56px' }}
            /> */}

            <div className="todo-btns">
                <button className="todo-btn">Add</button>
                <button className="cancel-btn" onClick={() => onCloseModal()}>Cancel</button>
            </div>

        </form>
    </section>

}