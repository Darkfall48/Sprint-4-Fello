import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/workspace/board-list";
import { showErrorMsg, showSuccessMsg } from "../services/connection/event-bus.service";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";

import { loadBoards, removeBoard } from "../store/actions/board.actions";

export function Workspace() {

  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const starredBoard = boards.filter((board) => board.isStarred)

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

  // function onCountryClick(ev, country) {
  //   ev.preventDefault()
  //   const { recentlyViewed } = this.state;
  //   const newState = {}; // add your other updates here

  //   if (!recentlyViewed.includes(country)) {
  //     // firstly take first two items as a new array
  //     newState.recentlyViewed = recentlyViewed.slice(1);
  //     // add country into beginning of new array
  //     newState.recentlyViewed.unshift(country);
  //   }

  //   this.setState(newState);

  // }


  if (!boards) return <div>Loading...</div>
  return <section className="workspace-section" >

    <div className="starred-boards-container">
      {/* {starredBoard.length && <h1><AiOutlineStar className="workspace-icons"/> Starred boards</h1>} */}
      {onStarredBoard()}
      <BoardList
        boards={starredBoard}
        onRemoveBoard={onRemoveBoard}
      />
    </div>
    <div className="starred-boards-container">
      <h1><AiOutlineClockCircle className="workspace-icons" /> Recently viewed</h1>
      <BoardList
        boards={boards}
        onRemoveBoard={onRemoveBoard}
      />
    </div>
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
