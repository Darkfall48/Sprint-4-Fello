
import { Link } from 'react-router-dom'
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { updateBoard } from '../../store/actions/board.actions';

export function BoardPreview({ board, onRemoveBoard }) {

  function onStarredBoard(ev) {
    ev.stopPropagation()
    board.isStarred = !board.isStarred
    updateBoard(board)
    console.log('board', board);
  }

  function recentlyViewedBoard() {
    board.lastViewed = Date.now()
    console.log('board.lastViewed from preview', board.lastViewed);
    updateBoard(board)
    // console.log('last viewed', board);
  }

  return <>
    <Link to={`/board/${board._id}`} onClick={() => recentlyViewedBoard()}>
      <section className="board-preview skeleton" style={board?.style?.backgroundImg ? { background: `url(${board.style.backgroundImg}) center center / cover`, filter: 'contrast(80%)' } : { background: '#0079bf', filter: 'contrast(80%)' } || board?.style?.bgColor ? { background: board.style.bgColor, filter: 'contrast(80%)' } : { background: '#0079bf', filter: 'contrast(80%)' }}>
        <span className="board-fade"></span>
      </section>
    </Link>

    <h4 className='title-preview'>{board.title}</h4>

    <div className="hidden-btns">
      {!board.isStarred && <div onClick={onStarredBoard}><AiOutlineStar className="star" /></div>}
      {board.isStarred && <div onClick={onStarredBoard}><AiFillStar className="starred" /></div>}
    </div>
  </>
}
