//? Libraries
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
//? Services
import { showSuccessMsg, showErrorMsg } from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service.local.js'
//? Store
import { loadGroups, addGroup, loadBoard, loadBoards } from '../../store/actions/board.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
import { BoardDetails } from '../../cmps/board/board-details.jsx'

export function BoardIndex() {
  // const [board, setBoard] = useState(null)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { boardId } = useParams()
  
  useEffect(() => {
    onLoadBoard()
  }, [])
  
  async function onLoadBoard() {
    try {
      await loadBoards()
      await loadBoard(boardId)
      // const board = await boardService.get(boardId)
      // setBoard(board)
      showSuccessMsg('Groups loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }
  
  // if (!board) return <p>loading...</p>
  return (
    <section className="group-index-section" style={board?.style?.backgroundImg ? { background: `url(${board.style.backgroundImg}) center center / cover` } : { background: '#0079bf' } || board?.style?.bgColor ? { background: board.style.bgColor } : { background: '#0079bf' }}>
      <BoardDetails />
    </section>
  )
}
