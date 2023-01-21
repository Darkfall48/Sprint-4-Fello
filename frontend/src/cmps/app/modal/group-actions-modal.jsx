import { useSelector } from 'react-redux'
import { updateBoard} from '../../../store/actions/board.actions'
import { store } from '../../../store/store'
import { showSuccessMsg, showErrorMsg, } from '../../../services/connection/event-bus.service'


export function GroupActionsModal({group}) {

    const board = useSelector((storeState) => storeState.boardModule.board)


    async function onRemoveGroup(groupId) {
        const updatedGroups = board.groups.filter((group) => group.id !== groupId)
        const updatedBoard = { ...board, groups: updatedGroups }
        console.log('newBoard', updatedBoard)
        try {
          await updateBoard(updatedBoard)
        //   loadBoard()
          showSuccessMsg('Group removed')
        } catch (err) {
          showErrorMsg('Cannot remove group')
        }
      }

    return <section className='group-actions-modal-list-container'>
        <button className='modal-btn-full' onClick={() => onRemoveGroup(group.id)}>
            Add card...
        </button>
        <button className='modal-btn-full' onClick={() => onRemoveGroup(group.id)}>
            Archive this list
        </button>
    </section>
}