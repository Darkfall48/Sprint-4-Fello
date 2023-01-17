//TODO load all groups

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
//? Services
import { showSuccessMsg, showErrorMsg } from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service.local'
//? Cmps
import { GroupPreview } from './group-preview.jsx'

export function GroupList() {
  const [board, setBoard] = useState()
  const [groups, setGroups] = useState(boardService.getDemoGroups())
  // useEffect(() => {
  //   loadBoard()
  // }, [])

  // async function onRemoveGroup(groupId) {
  //   try {
  //     await removeGroup(groupId)
  //     showSuccessMsg('Group removed')
  //   } catch (err) {
  //     showErrorMsg('Cannot remove group')
  //   }
  // }

  // async function onAddGroup() {
  //   const group = boardService.getEmptyGroup()
  //   group.vendor = prompt('Vendor?')
  //   try {
  //     const savedGroup = await addGroup(group)
  //     showSuccessMsg(`Group added (id: ${savedGroup._id})`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add group')
  //   }
  // }

  // async function onUpdateGroup(group) {
  //   const price = +prompt('New price?')
  //   const groupToSave = { ...group, price }
  //   try {
  //     const savedGroup = await updateGroup(groupToSave)
  //     showSuccessMsg(`Group updated, new price: ${savedGroup.price}`)
  //   } catch (err) {
  //     showErrorMsg('Cannot update group')
  //   }
  // }

  // function onAddGroupMsg(group) {
  //   console.log(`TODO Adding msg to group`)
  // }
  return (
    <section className="group-list-section">
      <h1>Hello from Group List</h1>
      <ul className="group-list">
        {groups.map((group) => (
          <li className="group-preview" key={group.id}>
            <div>
              <GroupPreview group={group} />
              {/* <button onClick={() => { onRemoveGroup(group._id)}}> x </button> */}
              {/* <button onClick={() => { onUpdateGroup(group) }}> Edit </button> */}
            </div>
            {/* <button onClick={() => { onAddGroupMsg(group) }} > Add group msg </button> */}
          </li>
        ))}
      </ul>
      {/* <button onClick={onAddGroup}>+ Add another list</button> */}

    </section >
  )
}


