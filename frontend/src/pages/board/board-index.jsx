//? Libraries
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
//? Services
//? Store
import { loadBoard } from '../../store/actions/board.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
import { BoardDetails } from '../../cmps/board/board-details.jsx'
import { Loader } from '../../cmps/helpers/loader'
import { store } from '../../store/store'
import { utilService } from '../../services/util.service.js'

export function BoardIndex() {
  const board = useSelector((storeState) => storeState.boardModule.board)

  const { boardId } = useParams()
  useEffect(() => {
    loadBoard(boardId)
    return () => {
      store.dispatch({ type: 'CLEAN_STORE' })
    }
  }, [])

  if (!board) return <Loader />
  return (
    <section
      className="group-index-section"
      style={
        (board?.style?.backgroundImg && {
          background: `url(${board.style.backgroundImg}) center center / cover`,
        }) ||
        (board?.style?.bgColor && { background: board.style.bgColor })
      }
    >
      {/* {!board ? <Loader /> : <BoardDetails board={board} />} */}
      <BoardDetails board={board} />
      <Outlet />
    </section>
  )
}
