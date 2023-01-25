import { React, useState} from 'react';
import { CgClose } from 'react-icons/cg'
import { IoIosArrowBack } from 'react-icons/io'

import { AddBoardModal } from "./modal/add-board-modal";
import { GroupActionsModal } from './modal/group-actions-modal';
import { TaskAttachmentModal } from './modal/task-attachment-modal';
import { TaskChecklistModal } from './modal/task-checklist-modal';
import { TaskCoverModal } from './modal/task-cover-modal';
import { TaskDatesModal } from './modal/task-dates-modal';
import { TaskLabelsModal } from './modal/task-labels-modal';
import { TaskMembersModal } from './modal/task-members-modal';


export function Modal({ type, modalTitle, onCloseModal, group, onAddTask, task , board , onEditLabels}) {
    const [isReturnBtn, setIsReturnBtn] = useState(false)

    function onReturnBtn(isEditMode){
        setIsReturnBtn(isEditMode)
    }


    return <div className={`modal-content modal-${type}`} onClick={(e) => e.stopPropagation()} onBlur={()=>onCloseModal}>
        <div className="form-container" id="modal-form-container">

            <div id="modal-header">
                {isReturnBtn && <button className='return-btn' onClick={()=>{onReturnBtn(false)}}><IoIosArrowBack/></button> }
                <h6>{modalTitle} </h6>
                <button id='close-btn' onClick={onCloseModal}><CgClose /></button>
            </div>
            {(() => {
                switch (type) {
                    case 'add-board':
                        return <AddBoardModal onCloseModal={onCloseModal} />
                    case 'group-actions':
                        return <GroupActionsModal group={group} onCloseModal={onCloseModal} onAddTask={onAddTask} />
                    case 'task-members':
                        return <TaskMembersModal task={task} group={group}  board={board} onCloseModal={onCloseModal} onAddTask={onAddTask} />
                    case 'task-labels':
                        return <TaskLabelsModal task={task} group={group} board={board} onCloseModal={onCloseModal} onEditLabels={onEditLabels} onReturnBtn={onReturnBtn}  />
                    case 'task-checklist':
                        return <TaskChecklistModal onCloseModal={onCloseModal} board={board} task={task} group={group} />
                    case 'task-cover':
                        return <TaskCoverModal  task={task} group={group} onCloseModal={onCloseModal}/>
                    case 'task-attachment':
                        return <TaskAttachmentModal onCloseModal={onCloseModal} task={task} group={group}/>
                    case 'task-date':
                        return <TaskDatesModal onCloseModal={onCloseModal} task={task} group={group}/>
                    default:
                        console.log(`Cannot load component type: ${type}.`);
                }
            })()}
        </div>
    </div>


}