import React from 'react';
import { CgClose } from 'react-icons/cg'

import { AddBoardModal } from "./modal/add-board-modal";
import { GroupActionsModal } from './modal/group-actions-modal';


export function Modal({ type, modalTitle, onCloseModal, group }) {

    return <div className={`modal-content`} id={`modal-${type}`} onClick={(e) => e.stopPropagation()}>
            <div className="form-container">

                <div className="modal-header">
                    <h2>{modalTitle}</h2>
                    <button onClick={onCloseModal}><CgClose/></button>
                </div>
                {(() => {
                    switch (type) {
                        case 'add-board':
                            return <AddBoardModal onCloseModal={onCloseModal} />
                        case 'group-actions':
                            return <GroupActionsModal group={group} />
                        default:
                            console.log(`Cannot load component type: ${type}.`);
                    }
                })()}
            </div>
        </div>


}