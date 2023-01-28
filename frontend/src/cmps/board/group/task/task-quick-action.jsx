import { useRef, useState } from 'react'
import { HiOutlineArchive, HiOutlineUser } from 'react-icons/hi'
import { TbCreditCard } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../../../services/util.service'
import { groupService } from '../../../../services/board/group.service'
import { Modal } from '../../../app/modal'
import { TaskPreview } from './task-preview'

export function TaskQuickAction({ task, onArchiveTask, closeMenu, groupId, boardId, handleLabelClick, labelsPreview, buttonRef, isMenuOpen }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const quickButtonRef = useRef()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState('')
    const [group, setGroup] = useState(groupService.getGroupById(board, groupId))

    function onCloseModal() {
        setModalOpen('')
    }

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
                left: utilService.getPosition(buttonRef).left - 217 + 'px',
                top: utilService.getPosition(buttonRef).top - 3 + 'px',
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
                isMenuOpen={isMenuOpen}
                closeMenu={closeMenu}
            />
            <div className='quick-action-btns'>
                <button id="task-preview-edit-menu-btn"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        closeMenu()
                        navigate(`/board/${boardId}/group/${groupId}/task/${task.id}`)
                    }}
                >
                    <TbCreditCard />
                    <span className='quick-edit-btn-title'>Open card</span>
                </button>
                <button
                    id="task-preview-edit-menu-btn"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        // closeMenu()
                        setModalOpen('members')
                    }}
                    ref={quickButtonRef}
                >
                    <HiOutlineUser />
                    <span className='quick-edit-btn-title'>Change Members</span>
                </button>
                {modalOpen === 'members' && (
                    <Modal
                        type="task-members"
                        modalTitle="Members"
                        onCloseModal={onCloseModal}
                        task={task}
                        group={group}
                        board={board}
                        buttonRef={quickButtonRef}
                        isQuickEdit={true}
                    />
                )}
                <button
                    id="task-preview-edit-menu-btn"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        closeMenu()
                        onArchiveTask(task.id)
                    }}
                >
                    <HiOutlineArchive />
                    <span className='quick-edit-btn-title'>Archive</span>
                </button>
            </div>
        </div>
    </section>
}