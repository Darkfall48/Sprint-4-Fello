//? Libraries
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
//? Services
import { showSuccessMsg, showErrorMsg } from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service.local'
//? Store
import { loadBoards, addBoard, updateBoard, removeBoard } from '../../store/actions/board.actions.js'

export function BoardList() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)


  useEffect(() => {
    loadBoards()
  }, [])

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg('Board removed')
    } catch (err) {
      showErrorMsg('Cannot remove board')
    }
  }

  async function onAddBoard() {
    const board = boardService.getEmptyBoard()
    board.vendor = prompt('Vendor?')
    try {
      const savedBoard = await addBoard(board)
      showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  async function onUpdateBoard(board) {
    const price = +prompt('New price?')
    const boardToSave = { ...board, price }
    try {
      const savedBoard = await updateBoard(boardToSave)
      showSuccessMsg(`Board updated, new price: ${savedBoard.price}`)
    } catch (err) {
      showErrorMsg('Cannot update board')
    }
  }


  return (
    <section className="board-index-section">
      <main>
        <button onClick={onAddBoard}>Add Board ⛐</button>
        <ul className="board-list">
          {boards.map((board) => (
            <li className="board-preview" key={board._id}>
              <h4>{board.name}</h4>
              <div>
                <button
                  onClick={() => {
                    onRemoveBoard(board._id)
                  }}
                >
                  x
                </button>
                <button
                  onClick={() => {
                    onUpdateBoard(board)
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
