//? Libraries
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { HiOutlineUser } from 'react-icons/hi'
import { TbTag } from 'react-icons/tb'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { FiClock } from 'react-icons/fi'
import { ImAttachment } from 'react-icons/im'

//? Services
import { showSuccessMsg } from '../../services/connection/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from '../../services/connection/socket.service'
//? Store
import { store } from '../../store/store'
import { loadUser } from '../../store/actions/user.actions'

export function UserDetails() {
  const params = useParams()
  const user = useSelector((storeState) => storeState.userModule.watchedUser)

  useEffect(() => {
    loadUser(params.id)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }
  }, [])

  function onUserUpdate(user) {
    showSuccessMsg(
      `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    )
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className="user-details-section">
      <h1>User Details</h1>
      {user && (
        <div>
          <h3>{user.fullname}</h3>
          {/* Demo for dynamic images: */}
          <div
            className="user-img"
            style={{ backgroundImage: `url('/img/u${0}.png')` }}
          ></div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
      <button className="task-details-edit-btn"><HiOutlineUser className='icon-task-detail-btn'/> <span>Members</span> </button>
      <button className="task-details-edit-btn"><TbTag className='icon-task-detail-btn'/><span>Labels</span> </button>
      <button className="task-details-edit-btn"> <IoMdCheckboxOutline className='icon-task-detail-btn'/><span>Checklist</span></button>
      <button className="task-details-edit-btn"><FiClock className='icon-task-detail-btn'/><span>Dates</span></button>
      <button className="task-details-edit-btn"><ImAttachment className='icon-task-detail-btn'/><span>Attachment</span></button>
    </section>
  )
}
