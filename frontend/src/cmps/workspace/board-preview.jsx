
import { Link } from 'react-router-dom'
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { updateBoard } from '../../store/actions/board.actions';

export function BoardPreview({ board, onEditBoard, onRemoveBoard }) {



  function onStarredBoard(ev) {
    ev.stopPropagation()
    board.isStarred = !board.isStarred
    updateBoard(board)
    console.log('board', board);
  }

  return <>
    <Link to={`/board/${board._id}`}>
      <section className="board-preview skeleton" style={board?.style?.backgroundImg ? { background: `url(${board.style.backgroundImg}) center center / cover` } : { background: '#0079bf' } || board?.style?.bgColor ? { background: board.style.bgColor } : { background: '#0079bf' }}>

        <span className="board-fade">

          <div className="board-preview-details">
            <h4>{board.title}</h4>

            <div className="hidden-btns">
            {/* {!board.isStarred && <div onClick={(ev) => onStarredBoard(ev)}><AiOutlineStar className="star" /></div>}
            {board.isStarred && <div onClick={(ev) => onStarredBoard(ev)}><AiFillStar className="starred" /></div>} */}
            {/* {!board.isStarred && <div onClick={onStarredBoard}><AiOutlineStar className="star" /></div>}
            {board.isStarred && <div onClick={onStarredBoard}><AiFillStar className="starred" /></div>} */}
            {/* {!board.isStarred && <div style={{position:'relative', zIndex: 5}} onClick={onStarredBoard}><AiOutlineStar className="star" style={{position:'relative', zIndex: 5}}/></div>}
          {board.isStarred && <div style={{position:'relative', zIndex: 5}} onClick={onStarredBoard}><AiFillStar className="starred" style={{position:'relative', zIndex: 5}}/></div>} */}
            {/* {<button onClick={() => { onRemoveBoard(board._id) }}>x</button>} */}
            {/* <button onClick={() => { onEditBoard(board) }}>Change</button> */}

            </div>
          </div>
        </span>
      </section>
    </Link>

    <div className="hidden-btns">
      {!board.isStarred && <div onClick={onStarredBoard}><AiOutlineStar className="star" /></div>}
      {board.isStarred && <div onClick={onStarredBoard}><AiFillStar className="starred" /></div>}
    </div>
  </>
}
