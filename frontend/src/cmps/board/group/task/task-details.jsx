//? Libraries
import { useRef } from 'react'
import { useSelector } from 'react-redux'
//? Icons
import {
  BsCheck2Square,
  BsReverseLayoutTextWindowReverse,
} from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { VscClose } from 'react-icons/vsc'
//? Components
import { SetTitle } from './cmps/set-title'
import { SetLabels } from './cmps/set-labels'
import { SetMembers } from './cmps/set-members'
import { SetDescription } from './cmps/set-description'
import { SetChecklist } from './cmps/set-checklist'

export function TaskDetails({ isModalOpen, setIsModalOpen, groupId, task }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { current: group } = useRef(
    board.groups.filter((group) => group.id === groupId)[0]
  )

  console.log('Taskkyyyy', task)
  console.log('GroupIddddd', groupId)
  console.log('Grouppyyyy', group)
  console.log('Boardyyyy', board)

  //? Private Components
  function SetHeader() {
    const { style } = task
    if (!style.bgColor)
      return (
        <div className="task-details-section-header">
          <SetCloseBtn />
        </div>
      )
    return (
      <div
        className="task-details-section-header"
        style={{ backgroundColor: style.bgColor }}
      ></div>
    )
  }

  function SetCloseBtn() {
    return (
      <button
        className="task-details-section-close-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <VscClose />
      </button>
    )
  }

  return (
    <main
      className="task-details-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <section
        className="task-details-section"
        onClick={(ev) => ev.stopPropagation()}
      >
        <SetCloseBtn />
        <SetTitle group={group} task={task} />
        {task.labelIds && <SetLabels board={board} task={task} />}
        {task.memberIds && <SetMembers board={board} task={task} />}
        {task.description && (
          <>
            <GrTextAlignFull className="task-details-section-description-icon" />
            <SetDescription task={task} />
          </>
        )}
        {/*! Grid SCSS Not Working*/}
        {/* {task.checklists &&
          task.checklists.map((checklist, idx) => (
            <>
              <BsCheck2Square
                key={idx}
                className="task-details-section-checklist-icon"
              />
              <SetChecklist
                key={checklist.id + idx}
                task={task}
                checklist={checklist}
              />
            </>
          ))} */}
      </section>
    </main>
  )
}
