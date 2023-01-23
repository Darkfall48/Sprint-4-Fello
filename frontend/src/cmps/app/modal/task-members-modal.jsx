import { boardReducer } from "../../../store/reducers/board.reducer";
import { FiCheck } from 'react-icons/fi'

import { useState } from "react";

export function TaskMembersModal() {
    const [isMember, setIsMember] = useState(true)

    function checkIfMember() {
        setIsMember(true)
    }
    
    return <section className='modal-content-container'>
        <input type="text" />
        <p>Board members</p>
        <a className='modal-btn-full-members' >
            <img src="../../assets/img/members/member1.png" alt="" />
            <span>member.name</span>
            {isMember && <span><FiCheck /></span>}
        </a>
        <button className='modal-btn-full' >
            Show other workspace members
        </button>
    </section>
}