import { HiOutlineArchive } from 'react-icons/hi'
import { utilService } from '../../../../services/util.service'
import { TaskPreview } from './task-preview'

export function TaskQuickAction({ task, onArchiveTask, closeMenu, groupId, handleLabelClick, labelsPreview, buttonRef }) {
    console.log('buttonRef', buttonRef)
    return <section
        className="task-details-action-modal-overlay" 
        onClick={(e) => {
            e.stopPropagation()
            closeMenu()
        }}
    >
        <div
            onClick={e => e.stopPropagation()}
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
            <div className='quick-action-btns'>
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
        </div>
    </section>
}