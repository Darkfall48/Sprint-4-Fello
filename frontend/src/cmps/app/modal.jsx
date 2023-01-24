import { React, useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg'

import { AddBoardModal } from "./modal/add-board-modal";
import { GroupActionsModal } from './modal/group-actions-modal';
import { TaskChecklistModal } from './modal/task-checklist-modal';
import { TaskCoverModal } from './modal/task-cover-modal';
import { TaskLabelsModal } from './modal/task-labels-modal';
import { TaskMembersModal } from './modal/task-members-modal';


export function Modal({ type, modalTitle, onCloseModal, group, onAddTask, task , board , onEditLabels}) {

    return <div className={`modal-content modal-${type}`} onClick={(e) => e.stopPropagation()} onBlur={()=>onCloseModal}>
        <div className="form-container" id="modal-form-container">

            <div id="modal-header">
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
                        return <TaskLabelsModal task={task} board={board} onCloseModal={onCloseModal} onEditLabels={onEditLabels} />
                    case 'task-checklist':
                        return <TaskChecklistModal onCloseModal={onCloseModal} board={board} task={task} group={group} />
                    case 'task-cover':
                        return <TaskCoverModal onCloseModal={onCloseModal} task={task} group={group}/>
                    default:
                        console.log(`Cannot load component type: ${type}.`);
                }
            })()}
        </div>
    </div>


}