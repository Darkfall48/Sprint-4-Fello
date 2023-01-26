import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/workspace/board-list";
import { showErrorMsg, showSuccessMsg } from "../services/connection/event-bus.service";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";

import { loadBoards, removeBoard } from "../store/actions/board.actions";
import { Loader } from "../cmps/helpers/loader";

export function Workspace() {

  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const starredBoard = boards.filter((board) => board.isStarred)
  // const day = 1000 * 60 * 60 * 24
  const recentlyViewedBoard = boards.filter((board) => board.lastViewed).sort((b1, b2) => b1.lastViewed - b2.lastViewed)


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

  function onStarredBoard() {
    if (!starredBoard.length) return
    else return <h1><AiOutlineStar className="workspace-icons" /> Starred boards</h1>
  }

  if (!boards) return <Loader />
  return <section className="workspace-section" >

    <div className="starred-boards-container">
      {onStarredBoard()}
      <BoardList
        boards={starredBoard}
        onRemoveBoard={onRemoveBoard}
      />
    </div>
    {/* <div className="starred-boards-container">
      <h1><AiOutlineClockCircle className="workspace-icons" /> Recently viewed</h1>
      <BoardList
        boards={recentlyViewedBoard}
        onRemoveBoard={onRemoveBoard}
      />
    </div> */}
    <div className="starred-boards-container">
      <h3>Your workspaces</h3>
      <BoardList
        boards={boards}
        onRemoveBoard={onRemoveBoard}
        createBoardPlaceholder={true}
      />
    </div>


  </section>
}
