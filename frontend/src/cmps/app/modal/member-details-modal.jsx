import { CgClose } from "react-icons/cg";

export function MemberDetailsModal({ onCloseModal, board, task }) {
    return <div className='modal-content' onClick={(e) => e.stopPropagation()} onBlur={() => onCloseModal}>

        <div id="modal-header">
            <h6>Keren Siebner</h6>
            <button id='close-btn' onClick={onCloseModal}><CgClose /></button>
        </div>
        Member
    </div>
}