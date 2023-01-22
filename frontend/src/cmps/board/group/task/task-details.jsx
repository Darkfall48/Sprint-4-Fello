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
import { HiOutlineUser } from 'react-icons/hi'
import { TbTag } from 'react-icons/tb'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { FiClock } from 'react-icons/fi'
import { ImAttachment } from 'react-icons/im'
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
        <div className="task-details-header-cover">
          <SetCloseBtn />
        </div>
      )
    return (
      <div
        className="task-details-header-cover"
        style={{ backgroundColor: style.bgColor }}
      ></div>
    )
  }

  function SetCloseBtn() {
    return (
      <button
        className="task-details-close-btn"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <VscClose />
      </button>
    )
  }

  return (
    <section
      className="task-details-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <section className="task-details">
        <SetCloseBtn />
        <header
          className="task-details-header"
          onClick={(ev) => ev.stopPropagation()}
        >
          {task.style.bgColor && <SetHeader />}
        </header>

        {/* <article className="task-details-title"> */}
        <SetTitle group={group} task={task} />
        {/* </article> */}

        <main
          className="task-details-main"
          onClick={(ev) => ev.stopPropagation()}
        >
          {task.labelIds && <SetLabels board={board} task={task} />}
          {task.memberIds && <SetMembers board={board} task={task} />}
          {task.description && (
            <>
              <GrTextAlignFull className="task-details-main-description-icon" />
              <SetDescription task={task} />
            </>
          )}
          {/*! Grid SCSS Not Working*/}
          {/* {task.checklists &&
          task.checklists.map((checklist, idx) => (
            <>
              <BsCheck2Square
                key={idx}
                className="task-details-main-checklist-icon"
              />
              <SetChecklist
                key={checklist.id + idx}
                task={task}
                checklist={checklist}
              />
            </>
          ))} */}
        </main>

        <aside
          className="task-details-aside"
          onClick={(ev) => ev.stopPropagation()}
        >
          <article className="task-details-aside-task-action">
            <h2 className="task-details-aside-task-action-title">
              Add to Card
            </h2>
            <button title="Members">
              <HiOutlineUser /> Members
            </button>
            <button title="Labels">
              <TbTag /> Labels
            </button>
            <button title="Checklist">
              <IoMdCheckboxOutline /> <span>Checklist</span>
            </button>
            <button title="Date">
              <FiClock /> Date
            </button>
            <button title="Imports">
              <ImAttachment /> Imports
            </button>
            <button title="Cover">Cover</button>
          </article>

          {/* <article className="task-details-aside-group-action">
            <h2 className="task-details-aside-group-action-title">Actions</h2>
            <button title="Move">Move</button>
            <button title="Copy">Copy</button>
            <button title="Make template">Make template</button>
            <hr />
            <button title="Archive">Archive</button>
            <button title="Share">Share</button>
          </article> */}
        </aside>
      </section>
    </section>
  )
}
