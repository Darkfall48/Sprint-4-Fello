//?Libraries
import { FiCheck } from 'react-icons/fi'
import { useState } from "react";
//?Services
import { loadBoard, updateTask } from "../../../store/actions/board.actions";


export function TaskMembersModal({ task, group, board }) {
    const [memberName, setMemberName] = useState('')
    const [filteredMembers, setFilteredMembers] = useState(board.members)

    function checkIfMember(member) {
        if (task.memberIds.includes(member._id))
            return <span style={{fontSize: '0.9em', paddingLeft: '5px' }}><FiCheck /></span>
        else return <span>{''}</span>
    }

    function handleChange({ target }) {
        const { value } = target
        setMemberName(value)
        const regex = new RegExp(value, 'i')
        const filteredMembers = board.members.filter((member) => regex.test(member.fullname))
        setFilteredMembers(filteredMembers)
    }

    async function toggleTaskMember(memberId) {
        let updatedMemberIds = []
        if (!task.memberIds.includes(memberId)) {
            updatedMemberIds = task.memberIds.concat(memberId)
        } else {
            const mmbrIds = task.memberIds
            updatedMemberIds = mmbrIds.filter(mmbrId => mmbrId !== memberId)
        }
        task = { ...task, memberIds: updatedMemberIds }
        try {
            await updateTask(group, task)
            loadBoard()
        } catch (err) {
            console.log('Failed to change task member', err)
        }
    }

    return <section className='modal-content-container'>
        <div className="members-modal-content-wrapper">
            <input type="text" value={memberName} onChange={handleChange} placeholder="Search members" />
            {!!filteredMembers?.length &&
                <div>
                    <p>Board members</p>
                    {filteredMembers?.map((member, idx) => {
                        return <div className="board-members-check" key={member._id + idx}>
                            <a id='modal-btn-full-members' onClick={() => toggleTaskMember(member._id)} >
                                <img key={1 + idx} className="task-details-main-members-container-img"
                                    src={`${member.imgUrl}`} alt="" />
                                <span key={member._id + idx}>{member.fullname}</span>
                                {checkIfMember(member)}
                            </a>
                        </div>
                    })}

                    <button id='modal-btn-full-grey' >
                        Show other workspace members
                    </button>
                </div>
            }
        </div>

        {!filteredMembers?.length && <div className="no-member-msg">Looks like that person isn't a member yet.
            Enter their email address to add them to the card and board.</div>}
    </section>
}