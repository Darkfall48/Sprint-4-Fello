import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { BoardList } from "../cmps/workspace/board-list";
import { showErrorMsg, showSuccessMsg } from "../services/connection/event-bus.service";
import { loadBoards, removeBoard } from "../store/actions/board.actions";

export function Workspace() {

  const boards = useSelector((storeState) => storeState.boardModule.boards)
  console.log('boards', boards);

  useEffect(() => {
    onLoadBoards()
  }, [])


  async function onLoadBoards() {
    try {
      await loadBoards()
      console.log('loaded boards');
      showSuccessMsg('Boards loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }

  async function onRemoveBoard(boardId) {
    await removeBoard(boardId)
    try {
      console.log(boardId, 'removed');
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }

  }

  if (!boards) return <div>Loading...</div>
  return <section className="board-index">

    <div className="filter-container">
      <Link to={`/board/edit`}>
        <button className="board-add">
          Add Board
        </button>
      </Link>
    </div>

    <BoardList
            boards={boards}
            onRemoveBoard={onRemoveBoard}
        />
  </section>
}