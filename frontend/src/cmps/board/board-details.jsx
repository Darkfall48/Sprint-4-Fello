//TODO: board name
//TODO: board starred
//TODO: board change status visability - SELECT
//TODO: Filter
import {GroupList} from '../../cmps/board/group/group-list.jsx'


export function BoardDetails({board}) {
  return (
    <section className="board-details-section">
      <h5>Board Details</h5>
      <GroupList board={board}/>
    </section>
  )
}
