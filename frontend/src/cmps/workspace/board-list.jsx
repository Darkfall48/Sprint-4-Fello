import { useState } from "react";
import { Link } from "react-router-dom"

import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ boards, onEditBoard, onRemoveBoard }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

    return <section className="board-list">
        {/* <Link to={`/board/add`}>
            <button className="board-add">
                Add Board
            </button>
        </Link> */}
        boa
        <ul>
            {boards.map((board, index) =>
                <li
                    key={index}
                    className="board-preview-list"
                >
                    <BoardPreview
                        board={board}
                        onEditBoard={onEditBoard}
                        onRemoveBoard={onRemoveBoard}
                    />

                </li>)}
        </ul>

        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} />}
    </section>
}