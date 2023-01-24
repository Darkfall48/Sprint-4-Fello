import { useRef, useState } from "react";
import { boardService } from "../../../services/board/board.service.local";
import { updateTask } from "../../../store/actions/board.actions";

export function TaskChecklistModal({ board, onCloseModal, group, task }) {

    const [checklistToAdd, setChecklistToAdd] = useState(boardService.getEmptyChecklist())
    const inputRef = useRef(null)

    console.log('board.groups.task!!!!!!!!', board.groups);

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

console.log('group.tasks', group.tasks);

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
            {board.groups.map(group => {
                group.tasks.map(task =>{
                    return <optgroup label={task.title}>
                    {task?.checklists?.map(checklist => {
                        return <option value={checklist.title}>{checklist.title}</option>
                    })}
                </optgroup>
                })
               

            })}
        </select>
    </div>
}