//? Libraries
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
//? Store
import { removeTask, updateTask } from '../../../../store/actions/board.actions'
//? Icons
import { BsCheck2Square } from 'react-icons/bs'
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
import { SetAttachment } from './cmps/set-attachment'
import { SetCloseBtn } from './cmps/set-close-btn'
import { SetChecklist } from './cmps/set-checklist'
import { SetDate } from './cmps/set-date'
import { SetDescription } from './cmps/set-description'
import { SetFollow } from './cmps/set-follow'
import { SetHeader } from './cmps/set-header'
import { SetLabels } from './cmps/set-labels'
import { SetMembers } from './cmps/set-members'
import { SetTitle } from './cmps/set-title'
import { Loader } from '../../../helpers/loader'
import { SetJoinBtn } from './cmps/set-join-btn'
import { MainModal } from '../../../app/main-modal'

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

  // console.log(
  //   'Hello from board:',
  //   boardId,
  //   'in list:',
  //   groupId,
  //   'as task:',
  //   taskId
  // )
  console.log('Taskkyyyy', task)
  // console.log('Grouppyyyy', group)
  // console.log('Boardyyyy', board)

  //? Update Task - CRUDL
  async function onUpdateTask(field, value) {
    console.log('Task updated by Field', field, 'with Value:', value)
    // if (!value || !value.length) return
    const updatedTask = { ...task, [field]: value }
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
      const websiteUrl = 'https://team-fello.onrender.com'
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


  // if (!board || !group || !task) return <Loader />
  if (!board || !group || !task) return
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

        <SetTitle onUpdateTask={onUpdateTask} group={group} task={task} />

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
              />
            )}
            <SetFollow onUpdateTask={onUpdateTask} task={task} />
            {task.dueDate && (
              <SetDate onUpdateTask={onUpdateTask} task={task} />
            )}
          </article>

          <SetDescription onUpdateTask={onUpdateTask} task={task} />
          {task.attachments && (
            <SetAttachment
              task={task}
              attachments={task.attachments}
              group={group}
            />
          )}
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
              <SetJoinBtn
                onUpdateTask={onUpdateTask}
                task={task}
                board={board}
              />
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
                ref={buttonRef}
              >
                <HiOutlineUser /> <span>Members</span>
              </button>
              {modalOpen === 'members' && (
                <MainModal
                  type="task-members"
                  modalTitle="Members"
                  onCloseModal={onCloseModal}
                  task={task}
                  group={group}
                  board={board}
                  buttonRef={buttonRef}
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
                <MainModal
                  type="task-labels"
                  modalTitle="Labels"
                  onCloseModal={onCloseModal}
                  task={task}
                  group={group}
                  board={board}
                  buttonRef={buttonRef}
                />
              )}
              <button
                title="I am Checklist"
                onClick={() => {
                  setModalOpen('checklist')
                }}
                ref={buttonRef}
              >
                <IoMdCheckboxOutline /> <span>Checklist</span>
              </button>
              {modalOpen === 'checklist' && (
                <MainModal
                  type="task-checklist"
                  modalTitle="Add checklist"
                  onCloseModal={onCloseModal}
                  board={board}
                  group={group}
                  task={task}
                  buttonRef={buttonRef}
                />
              )}
              <button
                title="I am Date"
                onClick={() => {
                  setModalOpen('date')
                }}
                ref={buttonRef}
              >
                <FiClock /> <span>Dates</span>
              </button>
              {modalOpen === 'date' && (
                <MainModal
                  type="task-date"
                  modalTitle="Dates"
                  onCloseModal={onCloseModal}
                  group={group}
                  task={task}
                  buttonRef={buttonRef}
                />
              )}
              <button
                title="I am Attachment"
                onClick={() => {
                  setModalOpen('attachment')
                }}
                ref={buttonRef}
              >
                <ImAttachment /> <span>Attachment</span>
              </button>
              {modalOpen === 'attachment' && (
                <MainModal
                  type="task-attachment"
                  modalTitle="Attach from…"
                  onCloseModal={onCloseModal}
                  group={group}
                  task={task}
                  buttonRef={buttonRef}
                />
              )}

              {!task.style?.bgImg && !task.style?.bgColor && (
                <>
                  <button
                    title="I am Cover"
                    onClick={() => {
                      setModalOpen('cover')
                    }}
                    ref={buttonRef}
                  >
                    <MdOutlineLaptop /> <span>Cover</span>
                  </button>
                  {modalOpen === 'cover' && (
                    <MainModal
                      type="task-cover"
                      modalTitle="Change Cover"
                      onCloseModal={onCloseModal}
                      group={group}
                      task={task}
                      buttonRef={buttonRef}
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
              <button title="Share" onClick={() => {
                setModalOpen('share')
                getUrl()
              }
              }
                ref={buttonRef}>
                <HiOutlineShare /> <span>Share</span>
              </button>
              {modalOpen === 'share' && (
                <MainModal
                  type="task-share"
                  modalTitle="Share and more…"
                  onCloseModal={onCloseModal}
                  buttonRef={buttonRef}
                />
              )}
            </div>
          </article>
        </aside>
      </section>
    </section>
  )
}
