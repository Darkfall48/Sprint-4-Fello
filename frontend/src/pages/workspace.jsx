import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/workspace/board-list";
import { showErrorMsg, showSuccessMsg } from "../services/connection/event-bus.service";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";

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

  const starredBoard = boards.filter((board) => board.isStarred)

  if (!boards) return <div>Loading...</div>
  return <section className="workspace-section" >

    <div className="starred-boards-container">
      <h1><AiOutlineStar className="workspace-icons"/> Starred boards</h1>
      {boards.map(board => {
        console.log('board.isStarred', board.isStarred);
        return board.isStarred
      }) && <BoardList
          boards={starredBoard}
          onRemoveBoard={onRemoveBoard}
        />}
    </div>
    <div className="starred-boards-container">
      <h1><AiOutlineClockCircle className="workspace-icons"/> Recently viewed</h1>
      <BoardList
        boards={boards}
        onRemoveBoard={onRemoveBoard}
      />
    </div>

  </section>
}
