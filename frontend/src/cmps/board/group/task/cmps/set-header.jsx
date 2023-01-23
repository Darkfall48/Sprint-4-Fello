//? Icons
import { MdOutlineLaptop } from 'react-icons/md'
//? Components
import { SetCloseBtn } from './set-close-btn'

export function SetHeader({ task }) {
  const { style } = task

  if (!style?.bgColor)
    return (
      <div className="task-details-header-cover">
        <SetCloseBtn />
      </div>
    )
  return (
    <div
      className="task-details-header-cover"
      style={{ backgroundColor: style.bgColor }}
    >
      <button title="Change cover">
        <MdOutlineLaptop /> Cover
      </button>
    </div>
  )
}
