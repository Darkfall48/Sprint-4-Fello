import { BoardPreview } from "./board-preview";

export function BoardList({ boards, onEditBoard, onRemoveBoard }) {

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
        </ul>
    </section>
}