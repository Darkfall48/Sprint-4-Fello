import { useRef, useState } from "react";
import { Loader } from "../helpers/loader";
import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ boards, onEditBoard, createBoardPlaceholder }) {
    const buttonRef = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

    if (!boards) return <Loader />
    return <section className="board-list">
        <ul>
            {boards.map((board, index) =>
                <li
                    key={index}
                    className="board-preview-list"
                >
                    <BoardPreview
                        board={board}
                        onEditBoard={onEditBoard}
                    />
                </li>)}
            {createBoardPlaceholder && <button ref={buttonRef} className="board-list-btn" onClick={() => { setIsModalOpen(!isModalOpen) }}>Create new board</button>}
        </ul>
        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} buttonRef={buttonRef} />}
    </section>
}
