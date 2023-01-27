//? Icons
import { HiOutlineUser } from 'react-icons/hi'

export function SetJoinBtn({ onUpdateTask, task, board }) {
  function onJoinTask() {
    const sidney = {
      _id: 'u102',
      fullname: 'Sidney Sebban',
      imgUrl:
        'https://res.cloudinary.com/dqbvyn6b2/image/upload/v1674716611/member2_…',
    }
    const currUser = sidney // TODO: Change to real current user
    // TODO: Add user to task members
    if (task?.priority !== 'high') onUpdateTask('priority', 'high')
  }
  return (
    <button onClick={onJoinTask} title="Add members">
      <HiOutlineUser /> Join
    </button>
  )
}
