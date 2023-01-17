//? Libraries
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
//? Services
// import { showSuccessMsg, showErrorMsg } from '../../services/connection/event-bus.service'
// import { boardService } from '../../services/board/board.service.local.js'
//? Store
// import { loadGroups, addGroup } from '../../store/actions/group.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
// import {GroupList} from '../../cmps/board/group/group-list.jsx'

export function BoardIndex() {
  // const groups = useSelector((storeState) => storeState.boardModule.groups)

  // useEffect(() => {
  //   loadGroups()
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
    <section className="group-index-section">
      <main>
        {/* <button onClick={onAddGroup}>+ Add another list</button> */}
        {/* <GroupList /> */}
      </main>
    </section>
  )
}
