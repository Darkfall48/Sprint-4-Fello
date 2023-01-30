import { useEffect, useRef, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { updateBoard } from '../../store/actions/board.actions'
import { BoardMenu } from './side-menu/board-menu'

export function BoardHeader({ board}) {
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStarred, setIsStarred] = useState(board.isStarred)

  useEffect(() => { }, [board.isStarred, isStarred])

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
    <section
      className={
        isModalOpen ? 'board-header open' : 'board-header'}
    >
      <div className="title-container btn-color" style={board?.style?.isLight ? { color: '#172B4D ' } : { color: 'white' }}>
        <h1
          style={board?.style?.isLight ? { color: '#172B4D ' } : { color: 'white' }}
          ref={contentRef}
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
              <AiOutlineStar className="board-header-star" style={board?.style?.isLight ? { fiil: '#172B4D ' } : { fill: 'white' }} />
            )}
          </button>
        }
      </div>

      <div className="btns-container">
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
        <span className="board-header-btn-divider"></span>
        <button
          style={board?.style?.isLight ? { color: '#172B4D ' } : { color: 'white' }}
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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </section>
  )
}
