import { useEffect, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { updateTask } from "../../../../../../store/actions/board.actions"


export function TodoEdit({  onCloseModal, group, task, checklist }) {
console.log('checklist', checklist);
    const [editChecklist, onEditChecklist] = useState(checklist)
    const inputRef = useRef(null)

    useEffect(() => {
        // inputRef.current.focus()
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        onEditChecklist((prevTitle) => {
            return { ...prevTitle, [field]: value }
        })
    }

    return <section className="todo-edit-section">

        <textarea
            name="title"
            id="title"
            cols="30"
            rows="10"
            // placeholder={todo.title}
            value={editChecklist.title}
            onChange={handleChange}
            // ref={inputRef}
            // onBlur={() => onCloseModal()}
            style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '56px' }}
        >
        </textarea>

        <div className="todo-btns">
            <button className="todo-btn">Save</button>
            <button className="cancel-btn" onClick={() => (onCloseModal())}><AiOutlineClose /></button>
        </div>
    </section>

}