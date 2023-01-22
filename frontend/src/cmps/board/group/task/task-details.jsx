//? Libraries
import { useEffect, useRef, useState } from 'react'
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
import { HiOutlineArrowRight } from 'react-icons/hi'
import { MdOutlineContentCopy } from 'react-icons/md'
import { TbTemplate } from 'react-icons/tb'
import { TiArchive } from 'react-icons/ti'
import { HiOutlineShare } from 'react-icons/hi'
import { MdOutlineLaptop } from 'react-icons/md'
//? Components
import { SetTitle } from './cmps/set-title'
import { SetLabels } from './cmps/set-labels'
import { SetMembers } from './cmps/set-members'
import { SetDescription } from './cmps/set-description'
import { SetChecklist } from './cmps/set-checklist'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../../helpers/loader'

export function TaskDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const navigate = useNavigate()
  const { boardId, groupId, taskId } = useParams()
  const [group, setGroup] = useState([])
  const [task, setTask] = useState([])

  console.log(
    'Hello from board:',
    boardId,
    'in list:',
    groupId,
    'as task:',
    taskId
  )

  useEffect(() => {
    // if (!board || !board.length) return
    setGroup(board?.groups?.filter((group) => group.id === groupId)[0])
    setTask(group?.tasks?.filter((task) => task.id === taskId)[0])
  }, [board, group, task])

  console.log('GroupIddddd', groupId)
  console.log('Taskkyyyy', task)
  console.log('Grouppyyyy', group)
  console.log('Boardyyyy', board)

  //? Private Components
  function SetHeader() {
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

  function SetCloseBtn() {
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

  if (!board || !group || !task) return <Loader />
  // return (
  //   <div>
  //     Hello from board {boardId} in list {groupId} as task {taskId}
  //   </div>
  // )
  return (
    <section
      className="task-details-modal-overlay"
      onClick={() => navigate(`/board/${boardId}`)}
      // onClick={() => setIsModalOpen(false)}
    >
      <section className="task-details">
        <SetCloseBtn />
        <header
          className="task-details-header"
          onClick={(ev) => ev.stopPropagation()}
        >
          {task?.style?.bgColor && <SetHeader />}
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
          <GrTextAlignFull className="task-details-main-description-icon" />
          <SetDescription task={task} />
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
          <article className="task-details-aside-suggested-action">
            <h2 className="task-details-aside-suggested-action-title">
              Suggested
            </h2>
            <div className="task-details-aside-suggested-action-button">
              {/* <button title="Settings">Setting</button> */}
              <button title="Add members">
                <HiOutlineUser /> Join
              </button>
            </div>
          </article>

          <article className="task-details-aside-task-action">
            <h2 className="task-details-aside-task-action-title">
              Add to Card
            </h2>
            <div className="task-details-aside-task-action-button">
              <button title="I am Members">
                <HiOutlineUser /> <span>Members</span>
              </button>
              <button title="I am Labels">
                <TbTag /> <span>Labels</span>
              </button>
              <button title="I am Checklist">
                <IoMdCheckboxOutline /> <span>Checklist</span>
              </button>
              <button title="I am Date">
                <FiClock /> <span>Date</span>
              </button>
              <button title="I am Attachment">
                <ImAttachment /> <span>Imports</span>
              </button>
            </div>
          </article>

          {/* <article className="task-details-aside-group-action">
            <h2 className="task-details-aside-group-action-title">Actions</h2>
            <div className="task-details-aside-group-action-button">
              <button title="Move">
                <HiOutlineArrowRight />
                <span>Move</span>
              </button>
              <button title="Copy">
                <MdOutlineContentCopy /> <span>Copy</span>
              </button>
              <button title="Make template">
                <TbTemplate />
                <span>Make template</span>
              </button>
              <hr />
              <button title="Archive">
                <TiArchive />
                <span>Archive</span>
              </button>
              <button title="Share">
                <HiOutlineShare /> <span>Share</span>
              </button>
            </div>
          </article> */}
        </aside>
      </section>
    </section>
  )
}
