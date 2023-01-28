import { useEffect, useRef, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'
import { RiUserSharedLine } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
import { loadBoard, updateBoard } from '../../store/actions/board.actions'
import { BoardMenu } from './side-menu/board-menu'
import { Loader } from '../helpers/loader'

export function BoardHeader({ board }) {
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStarred, setIsStarred] = useState(board.isStarred)

  useEffect(() => {}, [board.isStarred, isStarred])

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function onOpenModal() {
    setIsModalOpen(!isModalOpen)
  }

  function changeContent(ev) {
    board.title = contentRef.current.innerText

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      updateBoard(board)
      contentRef.current.contentEditable = false
    }
    contentRef.current.contentEditable = true
  }

  function onStarredBoard() {
    board.isStarred = !board.isStarred
    setIsStarred(!board.isStarred)
    updateBoard(board)
  }

  return (
    // <section className={board?.style?.bgColor?.islight? "board-header light" : "board-header light"} style={isModalOpen && {marginRight: 301 + 'px'}}>
    <section
      className={
        // board?.style?.bgColor?.islight ? 'board-header light' : 'board-header light'}
        isModalOpen ? 'board-header open' : 'board-header'}
    >
      <div className="title-container btn-color">
        <h1
          ref={contentRef}
          style={{ wordBreak: 'keep-all' }}
          onKeyDown={(ev) => changeContent(ev)}
          onBlur={(ev) => changeContent(ev)}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {board.title}
        </h1>

        {
          <button onClick={onStarredBoard}>
            {board.isStarred ? (
              <AiFillStar className="board-header-starred" />
            ) : (
              <AiOutlineStar className="board-header-star" />
            )}
          </button>
        }
      </div>

      <div className="btns-container">
        <button>
          <BsFilter /> Filter
        </button>
        <span className="board-header-btn-divider"></span>
        <div className="members-container">
          {board.members?.map((member, index) => {
            return (
              <div key={index} className="member-img" style={{ zIndex: index }}>
                <img
                  src={member.imgUrl}
                  alt={member.fullname}
                  title={member.fullname}
                />
              </div>
            )
          })}
        </div>

        <button className="share">
          <RiUserSharedLine /> Share{' '}
        </button>
        <span className="board-header-btn-divider"></span>
        <button
          className="btns-container-dots-btn"
          onClick={() => {
            setIsModalOpen(!isModalOpen)
          }}
        >
          <BsThreeDots />
        </button>
        {isModalOpen && (
          <BoardMenu
            board={board}
            onCloseModal={onCloseModal}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </section>
  )
}
