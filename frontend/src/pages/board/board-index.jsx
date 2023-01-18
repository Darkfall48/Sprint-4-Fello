//? Libraries
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
//? Services
import { showSuccessMsg, showErrorMsg } from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service.local.js'
//? Store
import { loadGroups, addGroup } from '../../store/actions/board.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
import {GroupList} from '../../cmps/board/group/group-list.jsx'
import {BoardDetails} from '../../cmps/board/board-details.jsx'

export function BoardIndex() {

  return (
    <section className="group-index-section">
      <main>
        <BoardDetails/>
        <GroupList />
      </main>
    </section>
  )
}
