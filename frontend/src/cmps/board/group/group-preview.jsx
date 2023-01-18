import { TaskList } from './task/task-list'
import { BsPlus } from 'react-icons/bs'
import { TbTemplate } from 'react-icons/tb'

export function GroupPreview({ group }) {
  console.log('group.id', group)
  return (
    <section className="group-preview-section">
      <h1 className="group-title">{`${group.title}`}</h1>
      <TaskList groupId={group.id} tasks={group.tasks} />
      <div className="group-bottom-control-btns">
        <a>
          <BsPlus className="plus" />
          <span>Add a card</span>
        </a>
        <a name="template" id="template">
          <TbTemplate className="template-btn" />
        </a>
      </div>
    </section>
  )
}
