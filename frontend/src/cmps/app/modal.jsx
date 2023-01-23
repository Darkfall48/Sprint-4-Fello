import { React, useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg'

import { AddBoardModal } from "./modal/add-board-modal";
import { GroupActionsModal } from './modal/group-actions-modal';
import { TaskLabelsModal } from './modal/task-labels-modal';
import { TaskMembersModal } from './modal/task-members-modal';


export function Modal({ type, modalTitle, onCloseModal, group, onAddTask, task , board }) {

    return <div className={`modal-content modal-${type}`} onClick={(e) => e.stopPropagation()} >
        <div className="form-container" id="modal-form-container">

            <div className="modal-header" id={`modal-header-${type}`}>
                <h2>{modalTitle} </h2>
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
                        return <TaskLabelsModal task={task} group={group} onCloseModal={onCloseModal} onAddTask={onAddTask} />
                    default:
                        console.log(`Cannot load component type: ${type}.`);
                }
            })()}
        </div>
    </div>


}