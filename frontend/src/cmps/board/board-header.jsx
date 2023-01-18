
import { useRef } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { updateBoard } from "../../store/actions/board.actions";

export function BoardHeader({ board }) {

    const contentRef = useRef(null)

    function changeContent() {
        board.title = contentRef.current.innerText
        updateBoard(board)

    }

    return <section className="board-header">
        <div className="title-container btn-color">
            <h1 ref={contentRef} onKeyUp={() => changeContent()} contentEditable={true} suppressContentEditableWarning={true}>{board.title}</h1>
            <button><AiOutlineStar className="star"/></button>
        </div>

        <div className="btns-container">
            <button><BsFilter /> Filter</button>
            <img src={board.members?.imgUrl} alt="" />
            <button><RiUserSharedLine/> Share</button>
        </div>

    </section>
}