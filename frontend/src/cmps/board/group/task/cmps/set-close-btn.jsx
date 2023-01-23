//? Libraries
import { useNavigate } from 'react-router-dom'
//? Icon
import { VscClose } from 'react-icons/vsc'

export function SetCloseBtn({ boardId, task }) {
  const navigate = useNavigate()

  return (
    <button
      className={`task-details-close-btn-${
        task?.style?.bgColor ? 'with-header' : 'no-header'
      }`}
      onClick={() => navigate(`/board/${boardId}`)}
    >
      <VscClose />
    </button>
  )
}
