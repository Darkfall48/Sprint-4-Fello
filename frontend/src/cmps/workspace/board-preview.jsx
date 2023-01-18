import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function BoardPreview({ board, onEditBoard, onRemoveBoard }) {

  return <Link to={`/board/${board._id}`}>
    <section className="board-preview skeleton" style={board?.style?.backgroundImg ? {background: `url(${board.style.backgroundImg}) center center / cover`}: {background: '#0079bf'} || board?.style?.bgColor ?{background:board.style.bgColor} : {background: '#0079bf'}}>

      <div className="board-preview-details">
        <h4>{board.title}</h4>

        <div className="hidden-btns">
          {/* {<button onClick={() => { onRemoveBoard(board._id) }}>x</button>} */}
          {/* {<Link to={`/board/${board._id}`}>edit</Link>} */}
          {/* <button onClick={() => { onEditBoard(board) }}>Change price</button> */}
          {/* <Link to={`/board/${board._id}`}>Details</Link> */}
        </div>
      </div>

    </section>
  </Link>

}
