//? Libraries
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
//? Store
import { removeTask, updateTask } from '../../../../store/actions/board.actions'
//? Icons
import { GrTextAlignFull } from 'react-icons/gr'
import { HiOutlineUser } from 'react-icons/hi'
import { RxActivityLog } from 'react-icons/rx'
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
import { SetActivities } from './cmps/set-activities'
import { SetCloseBtn } from './cmps/set-close-btn'
import { SetChecklist } from './cmps/set-checklist'
import { SetDescription } from './cmps/set-description'
import { SetHeader } from './cmps/set-header'
import { SetLabels } from './cmps/set-labels'
import { SetMembers } from './cmps/set-members'
import { SetTitle } from './cmps/set-title'
import { Loader } from '../../../helpers/loader'
import { BsCheck2Square } from 'react-icons/bs'
import { Modal } from '../../../app/modal'
import { SetAttachment } from './cmps/set-attachment'

export function TaskDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { boardId, groupId, taskId } = useParams()
  const buttonRef = useRef()

  const [group, setGroup] = useState([])
  const [task, setTask] = useState([])
  const [modalOpen, setModalOpen] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // if (!board || !board.length) return
    setGroup(board?.groups?.filter((group) => group.id === groupId)[0])
    setTask(group?.tasks?.filter((task) => task.id === taskId)[0])
  }, [board, group, task])

  console.log(
    'Hello from board:',
    boardId,
    'in list:',
    groupId,
    'as task:',
    taskId
  )
  // console.log('Taskkyyyy', task)
  // console.log('Grouppyyyy', group)
  // console.log('Boardyyyy', board)

  //? Update Task - CRUDL
  async function onUpdateTaskTitle({ value }) {
    const updatedTask = { ...task, title: value }
    try {
      setTask(updatedTask)
      await updateTask(group, updatedTask)
      console.log('Task:', taskId, 'updated successfully!')
    } catch (err) {
      console.log('Cannot update Task', taskId, ':', err)
    }
  }

  //? Remove Task - CRUDL
  async function onRemoveTask(group, taskId) {
    try {
      await removeTask(group, taskId)
      navigate(-1)
      console.log('Task', taskId, 'removed')
    } catch (err) {
      console.log('Cannot remove Task', taskId, ':', err)
    }
  }

  //? Aside Private Functions
  async function getUrl() {
    try {
      const { pathname } = location
      const websiteUrl = '`https://link.com'
      const url = websiteUrl + pathname
      await navigator.clipboard.writeText(url)
      console.log('URL was copied to clipboard:', url)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  function onCloseModal() {
    setModalOpen('')
  }

  function onEditLabels() {
    console.log('edit labels')
  }

  if (!board || !group || !task) return <Loader />
  return (
    <section
      className="task-details-modal-overlay"
      onClick={() => navigate(`/board/${boardId}`)}
    >
      <section className="task-details">
        <SetCloseBtn boardId={boardId} task={task} />

        <header
          className="task-details-header"
          onClick={(ev) => ev.stopPropagation()}
        >
          {(task?.style?.bgColor || task?.style?.bgImg) && (
            <SetHeader task={task} group={group} />
          )}
        </header>

        <SetTitle
          onUpdateTaskTitle={onUpdateTaskTitle}
          group={group}
          task={task}
        />

        <main
          className="task-details-main"
          onClick={(ev) => ev.stopPropagation()}
        >
          <article className="task-details-main-article-container">
            {task.memberIds && (
              <SetMembers board={board} task={task} group={group} />
            )}
            {task.labelIds && (
              <SetLabels
                board={board}
                task={task}
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                onCloseModal={onCloseModal}
                group={group}
                onEditLabels={onEditLabels}
              />
            )}
          </article>

          <SetDescription task={task} />
          {task.attachments &&
            task.attachments.map((attachment, idx) => (
              <SetAttachment
                key={attachment.id + idx}
                task={task}
                attachment={attachment}
                group={group}
              />
            ))}
          {/*! Grid SCSS Not Working*/}
          {task.checklists &&
            task.checklists.map((checklist, idx) => (
              <SetChecklist
                key={checklist.id + idx}
                task={task}
                checklist={checklist}
                group={group}
              />
            ))}
          {board && <SetActivities board={board} taskId={taskId} />}
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
              <button
                title="I am Members"
                onClick={() => {
                  setModalOpen('members')
                }}
              >
                <HiOutlineUser /> <span>Members</span>
              </button>
              {modalOpen === 'members' && (
                <Modal
                  type="task-members"
                  modalTitle="Members"
                  onCloseModal={onCloseModal}
                  task={task}
                  group={group}
                  board={board}
                />
              )}
              <button
                title="I am Labels"
                onClick={() => {
                  setModalOpen('labels')
                }}
                ref={buttonRef}
              >
                <TbTag /> <span>Labels</span>
              </button>
              {modalOpen === 'labels' && (
                <Modal
                  type="task-labels"
                  modalTitle="Labels"
                  onCloseModal={onCloseModal}
                  task={task}
                  group={group}
                  board={board}
                  onEditLabels={onEditLabels}
                  buttonRef={buttonRef}
                />
              )}
              <button
                title="I am Checklist"
                onClick={() => {
                  setModalOpen('checklist')
                }}
              >
                <IoMdCheckboxOutline /> <span>Checklist</span>
              </button>
              {modalOpen === 'checklist' && (
                <Modal
                  type="task-checklist"
                  modalTitle="Add checklist"
                  onCloseModal={onCloseModal}
                  board={board}
                  group={group}
                  task={task}
                />
              )}
              <button
                title="I am Date"
                onClick={() => {
                  setModalOpen('date')
                }}
              >
                <FiClock /> <span>Dates</span>
              </button>
              {modalOpen === 'date' && (
                <Modal
                  type="task-date"
                  modalTitle="Dates"
                  onCloseModal={onCloseModal}
                  group={group}
                  task={task}
                />
              )}
              <button
                title="I am Attachment"
                onClick={() => {
                  setModalOpen('attachment')
                }}
              >
                <ImAttachment /> <span>Attachment</span>
              </button>
              {modalOpen === 'attachment' && (
                <Modal
                  type="task-attachment"
                  modalTitle="Attach from…"
                  onCloseModal={onCloseModal}
                  group={group}
                  task={task}
                />
              )}

              {!task.style?.bgImg && !task.style?.bgColor && (
                <>
                  <button
                    title="I am Cover"
                    onClick={() => {
                      setModalOpen('cover')
                    }}
                  >
                    <MdOutlineLaptop /> <span>Cover</span>
                  </button>
                  {modalOpen === 'cover' && (
                    <Modal
                      type="task-cover"
                      modalTitle="Change Cover"
                      onCloseModal={onCloseModal}
                      group={group}
                      task={task}
                    />
                  )}
                </>
              )}
            </div>
          </article>

          <article className="task-details-aside-group-action">
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
              <button
                title="Archive"
                onClick={() => onRemoveTask(group, taskId)}
              >
                <TiArchive />
                <span>Archive</span>
              </button>
              <button title="Share" onClick={getUrl}>
                <HiOutlineShare /> <span>Share</span>
              </button>
            </div>
          </article>
        </aside>
      </section>
    </section>
  )
}
