
import { useRef, useState } from 'react';
import { BsCheck2Square } from 'react-icons/bs'
import { updateTask } from '../../../../../store/actions/board.actions';
import { TodoAdd } from './checklist/todo-add';

import { TodoList } from "./checklist/todo-list";

export function SetChecklist({ task, checklist, group }) {
  const contentRef = useRef(null)

  //for scss
  // const numChecklists = task.checklists.length
  // const root = document.documentElement
  // root.style.setProperty('--num-checklists', numChecklists)

  const [isModalOpen, setIsModalOpen] = useState(false)

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function onRemoveTodo(todoId) {
    console.log('todoId', todoId);
    const { todos } = checklist

    const idx = todos.findIndex(todo => todo.id === todoId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${todoId}`)
    todos.splice(idx, 1)

    updateTask(group, task)

  }

  function onDoneTodo(todo) {
    console.log('todo', todo);

    todo.isDone = !todo.isDone
    updateTask(group, task)
    console.log('updated task isDone', task);
  }

  function getUserProgress() {
    const { todos } = checklist
    if (todos.length) {
      let doneTodos = todos.filter((todo) => todo.isDone === true)
      let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)
      return toPrecentage
    }
  }

  function changeContent(ev) {
    checklist.title = contentRef.current.innerText

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      updateTask(group, task)
      contentRef.current.contentEditable = false
    }
    contentRef.current.contentEditable = true
  }

  return (
    <section className="task-details-main-checklist">
      <div className="checklist-details">
        <h3
          ref={contentRef}
          onKeyDown={(ev) => changeContent(ev)}
          onBlur={(ev) => changeContent(ev)}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >{checklist.title}</h3>
        <button className='todo-btns-btn'>Delete</button>
      </div>

      <div className="progress-bar-container">
        <span>{getUserProgress()}%</span>
        <div className="progress-bar-bg">
          <div className="progress-bar" style={{ height: "24px", width: getUserProgress() + "%", background: getUserProgress() === 100 ? '#61bd4f' : '#5ba4cf' }}>
          </div>
        </div>
      </div>

      <TodoList
        todos={checklist.todos}
        onRemoveTodo={onRemoveTodo}
        onDoneTodo={onDoneTodo}
      // onEditTodo={onEditTodo}
      />
      {!isModalOpen && <button className='add-todo-btn todo-btns-btn' onClick={() => setIsModalOpen(!isModalOpen)}>Add an item</button>}
      {isModalOpen && <TodoAdd task={task} group={group} checklist={checklist} onCloseModal={onCloseModal} />}
    </section>
  )
}
//   return (
//     <section className="task-details-main-checklist">
//       {checklist.todos.map((todo, idx) => (
//            <TodoPreview todo={todo} />
//         <div key={todo.id + idx}>
//          <p>{todo.title}</p>
//         <button>X</button>
//         </div>
//       ))}
//       <button>Add an item</button>
//       {/* <TodoAdd /> */}
//     </section>
//   )
// }

