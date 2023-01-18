//? Libraries
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
//? Services
import { showSuccessMsg, showErrorMsg } from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service.local.js'
//? Store
import { loadGroups, addGroup } from '../../store/actions/board.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
import {BoardDetails} from '../../cmps/board/board-details.jsx'

export function BoardIndex() {
  const [board, setBoard] = useState(null)
  const params = useParams()
  console.log('params', params)
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  // console.log('boards', boards);

  useEffect(() => {
    loadBoard()
  }, [])

  async function loadBoard() {
    try {
      const board = await boardService.get(params.boardId)
      setBoard(board)
      showSuccessMsg('Groups loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }
  if (!board) return <p>loading...</p>
  return (
    <section className="group-index-section">
        <BoardDetails board={board}/>
    </section>
  )
}
