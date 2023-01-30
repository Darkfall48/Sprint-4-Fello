//TODO: board name
//TODO: board starred
//TODO: board change status visability - SELECT
//TODO: Filter
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { socketService, SOCKET_EMIT_BOARD_WATCH, SOCKET_EVENT_BOARD_UPDATED } from '../../services/connection/socket.service.js'
import { getActionUpdateBoard, removeBoard, updateBoard } from '../../store/actions/board.actions.js'
import { UPDATE_BOARD } from '../../store/reducers/board.reducer.js'
import { store } from '../../store/store.js'
import { Loader } from '../helpers/loader.jsx'
import { BoardHeader } from './board-header'

export function BoardDetails({ board }) {

  const dispatch = useDispatch()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_BOARD_UPDATED, socketUpdateBoard)
    // return ()=>{
    //   socketService.off(SOCKET_EVENT_BOARD_UPDATED, socketUpdateBoard)
    // }
  }, [])

  function socketUpdateBoard(updatedBoard) {
    console.log('updatedBoard', updatedBoard)
    dispatch({ type: UPDATE_BOARD, board: updatedBoard })
  }

  if (!board) return <Loader />
  return (
    <section className="board-details-section">
      <BoardHeader board={board} />
      <GroupList board={board} />
    </section>
  )
}
