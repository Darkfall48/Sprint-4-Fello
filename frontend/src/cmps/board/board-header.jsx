
import { useEffect, useRef } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { updateBoard } from "../../store/actions/board.actions";
import { useSelector } from 'react-redux'
export function BoardHeader() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    const contentRef = useRef(null)

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
        updateBoard(board)
        console.log('board', board);
    }
    console.log('board.isStarred', board.isStarred);

    return <section className="board-header">
        <div className="title-container btn-color">
            <h1 ref={contentRef} style={{ wordBreak: 'keep-all' }} onKeyDown={(ev) => changeContent(ev)} onBlur={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{board.title}</h1>
            {!board.isStarred && <button onClick={onStarredBoard}><AiOutlineStar className="star" /></button>}
            {board.isStarred && <button onClick={onStarredBoard}><AiFillStar className="starred" /></button>}
        </div>

        <div className="btns-container">
            <button><BsFilter /> Filter</button>
            <img src={board.members?.imgUrl} alt="" />
            <button><RiUserSharedLine /> Share</button>
            <button><RiUserSharedLine /> Share</button>
        </div>

    </section>
}