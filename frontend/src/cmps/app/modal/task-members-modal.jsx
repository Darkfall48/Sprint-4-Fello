import { boardReducer } from "../../../store/reducers/board.reducer";
import { FiCheck } from 'react-icons/fi'

import { useState } from "react";
import { MdRememberMe } from "react-icons/md";
import { useEffect } from "react";
import { loadBoard, updateTask } from "../../../store/actions/board.actions";

export function TaskMembersModal({ task, group, board, onCloseModal, onAddTask }) {
    const [isTaskMember, setIsTaskMember] = useState(true)
    const [isAppMember, setIsAppMember] = useState(true)
    const [memberName, setMemberName] = useState('')
    const [filteredMembers, setFilteredMembers] = useState(board.members)

    console.log('filteredMembers', filteredMembers)
    function checkIfMember(member) {
        // console.log('member', member)
        // console.log('memberIds', task.memberIds)
        if (task.memberIds.includes(member._id))
            return <span><FiCheck /></span>
        else return <span>{''}</span>
    }

    // const member = board.members.find(mmbr => mmbr.id === member.id)

    function handleChange({ target }) {
        const { value } = target
        setMemberName(value)
        const regex = new RegExp(value, 'i')
        const filteredMembers = board.members.filter((member) => regex.test(member.fullname))
        setFilteredMembers(filteredMembers)
        console.log('filteredMembers', filteredMembers)
        console.log('memberName', memberName)
        if (!filteredMembers.length  && !memberName) {
            console.log('here!!!!')
            setIsAppMember(false)
        }
        console.log('isAppMember', isAppMember)
    }

    async function toggleTaskMember(memberId) {
        // console.log('memberId', memberId)
        let updatedMemberIds = []
        if (!task.memberIds.includes(memberId)) {
            updatedMemberIds = task.memberIds.concat(memberId)
            task = { ...task, memberIds: updatedMemberIds }
        } else {
            // console.log('im here!!')
            const mmbrIds = task.memberIds
            updatedMemberIds = mmbrIds.filter(mmbrId => mmbrId !== memberId)
            // console.log('mmbrIds', updatedMemberIds)
            task = { ...task, memberIds: updatedMemberIds }
            // console.log('task', task)
        }
        try {
            // console.log('group', group)
            // console.log('task', task)
            await updateTask(group, task)
            loadBoard()
        } catch (err) {
            console.log('Failed to change task member', err)
        }
    }

    return <section className='modal-content-container'>
        <div className="members-modal-content-wrapper">
            <input type="text" value={memberName} onChange={handleChange} placeholder="Search members" />
            {isAppMember &&
                <div>
                    <p>Board members</p>
                    {filteredMembers.map((member, idx) => {
                        return <div className="board-members-check" key={member._id+idx}>
                            <a  className='modal-btn-full-members' onClick={() => toggleTaskMember(member._id)} >
                                <img key={1+idx} className="task-details-main-members-container-img"
                                    // src="/static/media/member1.4e156bb8ab9ef5ddc99e.png" alt="" />
                                    src={`${member.imgUrl}`} alt="" />
                                <span key={member._id+idx}>{member.fullname}</span>
                                {checkIfMember(member)}
                            </a>
                        </div>
                    })}

                    <button className='modal-btn-full' >
                        Show other workspace members
                    </button>
                </div>
            }
        </div>

        {!isAppMember && <div className="no-member-msg">Looks like that person isn't a member yet.
            Enter their email address to add them to the card and board.</div>}
    </section>
}