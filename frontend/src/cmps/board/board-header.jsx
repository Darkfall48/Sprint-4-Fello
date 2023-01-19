
import { useRef } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { updateBoard } from "../../store/actions/board.actions";
import { useSelector } from 'react-redux'
export function BoardHeader() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    const contentRef = useRef(null)

    function changeContent(ev) {

        board.title = contentRef.current.innerText

        // try to fix enter 
        if (ev.key === 'Enter' || contentRef.current.onblur()) {
            ev.preventDefault()
            updateBoard(board)
            contentRef.current.contentEditable = false
        }
        contentRef.current.contentEditable = true

    }

    return <section className="board-header">
        <div className="title-container btn-color">
            <h1 ref={contentRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{board.title}</h1>
            <button><AiOutlineStar className="star" /></button>
        </div>

        <div className="btns-container">
            <button><BsFilter /> Filter</button>
            <img src={board.members?.imgUrl} alt="" />
            <button><RiUserSharedLine /> Share</button>
        </div>

    </section>
}