import { HiOutlineArchive } from 'react-icons/hi'

export function TaskQuickAction({task, onArchiveTask, closeMenu}) {
    return <section className="task-details-modal-overlay" onBlur={(ev)=>{closeMenu(ev)}}>
        <button
            id="task-preview-edit-menu-btn"
            onClick={(ev) => {
                ev.stopPropagation()
                onArchiveTask(task.id)
            }}
        >
            <HiOutlineArchive />
            <span>Archive</span>
        </button>
    </section>
}