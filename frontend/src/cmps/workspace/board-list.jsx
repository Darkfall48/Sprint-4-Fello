import { useState } from "react";
import { Modal } from "../app/modal";
import { BoardAdd } from "./board-add";

import { BoardPreview } from "./board-preview";

export function BoardList({ boards, onEditBoard, onRemoveBoard, createBoardPlaceholder }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

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
                        onRemoveBoard={onRemoveBoard}
                    />

                </li>)}
                {createBoardPlaceholder && <button className="board-list-btn" onClick={() => { setIsModalOpen(!isModalOpen) }}>Create new board</button>}
        </ul>

        {/* {isModalOpen &&  <Modal type={'add-board'} modalTitle={'Create board'} onCloseModal={onCloseModal}/> } */}
        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} />}
    </section>
}
