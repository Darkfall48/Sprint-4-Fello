//TODO: board name
//TODO: board starred
//TODO: board change status visability - SELECT
//TODO: Filter
import { useSelector } from 'react-redux'

import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { Loader } from '../helpers/loader.jsx'
import { BoardHeader } from './board-header'

export function BoardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  // console.log('boardddddd', board)

  // if (!board) return <Loader />

  return (
    <section className="board-details-section">
      <BoardHeader board={board}/>
      <GroupList board={board}/>
    </section>
  )
}
