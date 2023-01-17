//? Libraries
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
//? Services
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service'
//? Store
import {
  loadBoards,
  addBoard,
  updateBoard,
  removeBoard,
  addToCart,
} from '../../store/actions/board.actions.js'

export function BoardIndex() {
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

  function onAddToCart(board) {
    console.log(`Adding ${board.vendor} to Cart`)
    addToCart(board)
    showSuccessMsg('Added to Cart')
  }

  function onAddBoardMsg(board) {
    console.log(`TODO Adding msg to board`)
  }

  return (
    <section className="board-index-section">
      <h3>Board Index</h3>
      <main>
        <button onClick={onAddBoard}>Add Board ⛐</button>
        <ul className="board-list">
          {boards.map((board) => (
            <li className="board-preview" key={board._id}>
              <h4>{board.vendor}</h4>
              <h1>⛐</h1>
              <p>
                Price: <span>${board.price.toLocaleString()}</span>
              </p>
              <p>
                Owner: <span>{board.owner && board.owner.fullname}</span>
              </p>
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

              <button
                onClick={() => {
                  onAddBoardMsg(board)
                }}
              >
                Add board msg
              </button>
              <button
                className="buy"
                onClick={() => {
                  onAddToCart(board)
                }}
              >
                Add to boardt
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
