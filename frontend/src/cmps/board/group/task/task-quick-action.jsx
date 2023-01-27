import { HiOutlineArchive } from 'react-icons/hi'
import { utilService } from '../../../../services/util.service'
import { TaskPreview } from './task-preview'

export function TaskQuickAction({ task, onArchiveTask, closeMenu, groupId, handleLabelClick, labelsPreview, buttonRef, contentRef }) {
    console.log('buttonRef', buttonRef)
    return <section
        // className="task-details-modal-overlay" 
        onBlur={(ev) => { closeMenu(ev) }}
        // className="modal-content task-details-modal-overlay"
        onClick={(e) => e.stopPropagation()}
    >
        <div
            ref={contentRef}
            className="quick-action-modal"
            style={{
                left: utilService.getPosition(buttonRef).left -220 + 'px',
                top: utilService.getPosition(buttonRef).top + 0 + 'px',
            }}
        >
            <TaskPreview
                labelsPreview={labelsPreview}
                handleLabelClick={handleLabelClick}
                key={task.id}
                groupId={groupId}
                task={task}
                onArchiveTask={onArchiveTask}
                mode={'quick-edit'}
            />
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
        </div>
    </section>
}