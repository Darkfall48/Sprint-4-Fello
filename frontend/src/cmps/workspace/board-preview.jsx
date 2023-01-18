import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function BoardPreview({ board, onEditBoard, onRemoveBoard }) {

  console.log('board', board);

  return <section className="board-preview skeleton">
    <Link to={`/board/${board._id}`}>
    <h4>{board.title}</h4>

    <div className="hidden-btns">
      {<button onClick={() => { onRemoveBoard(board._id) }}>x</button>}
      {/* {<Link to={`/board/${board._id}`}>edit</Link>} */}
      {/* <button onClick={() => { onEditBoard(board) }}>Change price</button> */}
      {/* <Link to={`/board/${board._id}`}>Details</Link> */}
    </div>
    </Link>
  </section>
}
