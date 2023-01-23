import { boardReducer } from "../../../store/reducers/board.reducer";
import { FiCheck } from 'react-icons/fi'
import { useState } from "react";
export function TaskLabelsModal(){
    const [isAppMember, setIsAppMember] = useState(true)
    const [member, setMember] = useState(true)

    // function checkIfMember() {
    //     setIsTaskMember(true)
    // }

    function handleChange({ value }) {
        console.log(value)
    }

    return <section className='modal-content-container'>
        {/* {isAppMember && */}
            <div>
                <input type="text" value={member} onChange={handleChange} />
                <p>Board members</p>
                <a className='modal-btn-full-members' >
                    <img src="../../assets/img/members/member1.png" alt="" />
                    <span>member.name</span>
                    {/* {isTaskMember &&  */}
                    <span><FiCheck/></span>
                    {/* } */}
                </a>
                <button className='modal-btn-full' >
                    Show other workspace members
                </button>
            </div>
        {/*  } */}
        {/* {!isAppMember &&  */}
        <div className="no-member-msg">Looks like that person isn't a member yet.
            Enter their email address to add them to the card and board.</div>
            {/* } */}
    </section>
}