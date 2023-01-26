import { useRef, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { AiOutlineClose } from 'react-icons/ai'
import { updateTask } from '../../../../../store/actions/board.actions'

import { AttachmentList } from './attachment/attachment-list'

export function SetAttachment({ task, attachment, group }) {
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOn, setIsEditOn] = useState(false)
  const [editAttachmentlist, onEditAttachmentlist] = useState(attachment)
  console.log('attachment', attachment);
  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  // function onRemoveTodo(todoId) {
  //   const { todos } = checklist
  //   const idx = todos.findIndex((todo) => todo.id === todoId)
  //   todos.splice(idx, 1)

  //   updateTask(group, task)
  // }


  // function handleChange({ target }) {
  //   let { value, name: field } = target
  //   onEditAttachmentlist((prevTitle) => {
  //     return { ...prevTitle, [field]: value }
  //   })
  // }


  function onEditTodo(ev) {
    ev.preventDefault()

    // const { checklists } = task

    // const checklist = checklists.find(checklist => {
    //     const checklistId = checklist.id
    //     if (checklistId === checklist.id) return checklist
    // })

    // const { todos } = checklist

    // const updatedTask = { ...task, ...checklists, ...todos, todo: todoToAdd }
    // console.log('updatedTask', task);
    // updateTask(group, task)
    // inputRef.current.value = ''
  }

  function onRemoveAttachment(attachmentId) {
    const { attachments } = task
    const idx = attachments.findIndex(attachment => attachment.id === attachmentId)
    attachments.splice(idx, 1)
    updateTask(group, task)
  }

  return (
    <section className="task-details-main-attachment">
      <ImAttachment className="task-details-main-attachment-icon" />

      <ul className="task-details-main-attachment-list">

        <li
          className="task-details-main-attachments-list-attachment"
        >
          <div className="task-details-main-attachment-preview">
            <a href={attachment.img} target="_blank">
              <img src={attachment.img} alt="" />
            </a>
            <h3 className="attachment-title">
              {attachment.title}
            </h3>
          </div>

          {/* <div className="task-details-main-checklist-attachments-list-attachment-btn-container"> */}
          <button className="attachment-remove-btn" onClick={() => onRemoveAttachment(attachment.id)}>
            Delete
          </button>

        </li>

      </ul>
      {/* <button
        className="attachment-add-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add an Attachment
      </button> */}

      {/* {isModalOpen && <p>add attachment modal</p>} */}

      {/* {isModalOpen && (
        <TodoAdd
          task={task}
          group={group}
          checklist={checklist}
          onCloseModal={onCloseModal}
        />
      )} */}
    </section>
  )
}
