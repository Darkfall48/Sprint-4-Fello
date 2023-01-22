import { useSelector } from 'react-redux'
import { updateBoard, loadBoard } from '../../../store/actions/board.actions'
import { store } from '../../../store/store'
import { showSuccessMsg, showErrorMsg, } from '../../../services/connection/event-bus.service'
import { utilService } from '../../../services/util.service'

export function GroupActionsModal({ group, onCloseModal, onAddTask }) {

  const board = useSelector((storeState) => storeState.boardModule.board)


  async function onRemoveGroup(groupId) {
    const updatedGroups = board.groups.filter((group) => group.id !== groupId)
    const updatedBoard = { ...board, groups: updatedGroups }
    console.log('newBoard', updatedBoard)
    try {
      await updateBoard(updatedBoard)
      await loadBoard(board._id)
      showSuccessMsg('Group removed')
      onCloseModal()
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  async function onCopyList(groupId) {
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const copiedGroup = { ...group, id: utilService.makeId() }
    const groups = board.groups
    groups.splice(groupIdx, 0, copiedGroup)
    const updatedBoard = { ...board, groups }
    // console.log('newBoard', updatedBoard)
    try {
      await updateBoard(updatedBoard)
      await loadBoard(board._id)
      showSuccessMsg('Group removed')
      onCloseModal()
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  return <section className='group-actions-modal-list-container'>
    <button className='modal-btn-full' onClick={() => {
      onAddTask()
      onCloseModal()
    }}>
      Add card...
    </button>
    <button className='modal-btn-full' onClick={() => onCopyList(group.id)}>
      Copy list...
    </button>
    <button className='modal-btn-full' onClick={() => onRemoveGroup(group.id)}>
      Archive this list
    </button>
  </section>
}