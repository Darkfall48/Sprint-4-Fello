import { useRef, useState } from "react";
import { boardService } from "../../../services/board/board.service.local";
import { updateTask } from "../../../store/actions/board.actions";

export function TaskChecklistModal({ board, onCloseModal, group, task }) {

    const [checklistToAdd, setChecklistToAdd] = useState(boardService.getEmptyChecklist())
    const inputRef = useRef(null)


    function handleChange({ target }) {
        let { value, name: field } = target
        console.log('value', value);
        setChecklistToAdd((prevTodo) => {
            return { ...prevTodo, [field]: value }
        })
    }

    function onAddChecklist(ev) {
        ev.preventDefault()
        console.log('ev', ev);
        if (inputRef.current.value === '') return

        task.checklists.push(checklistToAdd)
        updateTask(group, task)
        onCloseModal()
        inputRef.current.value = ''
    }


    return <div>
        <p>Title</p>
        <form onSubmit={(ev) => onAddChecklist(ev)} >

            <input type="text"
                id="title"
                name="title"
                placeholder="Checklist"
                value={checklistToAdd.title}
                onChange={handleChange}
                ref={inputRef}
            />

        </form>
        <p>Copy items from...</p>
        <select name="copy-items-from" className="copy-items-from">
            <option value="none">(none)</option>
            {task.checklists.map(checklist => {
                return <optgroup label={checklist.title}>
                    {checklist.todos.map(todo => {
                        return <option value={todo.title}>{todo.title}</option>
                    })}
                </optgroup>

            })}
        </select>
    </div>
}