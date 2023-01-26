import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service'
import { addBoard } from '../../../store/actions/board.actions'

export function AddBoardModal({ onCloseModal }) {
  const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())
  const navigate = useNavigate()

  function handleChange({ target }) {
    let { value, name: field } = target
    setBoardToAdd((prevBoard) => ({ ...prevBoard, [field]: value }))
  }

  async function onSaveBoard(ev) {
    ev.preventDefault()
    onCloseModal()
    try {
      await addBoard(boardToAdd)
      console.log('board saved', boardToAdd)
      showSuccessMsg('Board saved!')
      // navigate(`/board/${boardToAdd._id}`)
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save board')
    }
    // navigate(`/board/${boardToAdd._id}`)
    navigate(`/board`)
  }

  function changeBoard(imgUrl, color) {
    boardToAdd.style.backgroundImg = imgUrl
    boardToAdd.style.bgColor = color

    if (!boardToAdd.style.bgColor) {
      boardToAdd.style.backgroundImg = imgUrl
      setBoardToAdd((prevBoard) => ({
        ...prevBoard,
        style: { backgroundImg: imgUrl, bgColor: '' },
      }))
    }

    if (!boardToAdd.style.backgroundImg) {
      boardToAdd.style.bgColor = color
      setBoardToAdd((prevBoard) => ({
        ...prevBoard,
        style: { backgroundImg: '', bgColor: color },
      }))
    }
  }
  return (
    <div>
      <div className="board-preview">
        <div
          className="img-container"
          style={
            (boardToAdd?.style?.backgroundImg && {
              background: `url(${boardToAdd.style.backgroundImg}) center center / cover`,
            }) ||
            (boardToAdd?.style?.bgColor && {
              background: boardToAdd.style.bgColor,
            })
          }
        >
          <img
            src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
            alt=""
          />
        </div>
      </div>

      <p>Background</p>
      <div className="btns-cover-img">
        {boardService.getImages().map((image, idx) => {
          return (
            <button
              key={idx}
              onClick={() => changeBoard(image, '')}
              className="btn-cover-img"
              style={{ backgroundImage: `url(${image})` }}
            ></button>
          )
        })}
      </div>

      <div className="btns-cover-color">
        {boardService.getColors().map((color, idx) => {
          return (
            <button
              key={idx}
              onClick={() => changeBoard('', color)}
              className="btn-cover-color"
              style={{ backgroundColor: color }}
            ></button>
          )
        })}
      </div>

      <form onSubmit={onSaveBoard}>
        <label htmlFor="title">
          Board title<span> *</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title..."
          value={boardToAdd.title}
          onChange={handleChange}
          required
        />

        <div className="add-save-btns">
          {boardToAdd.title && (
            <button className="allowed" style={{ cursor: 'pointer' }}>
              {' '}
              Create{' '}
            </button>
          )}
          {!boardToAdd.title && (
            <button style={{ cursor: 'not-allowed' }}> Create </button>
          )}
        </div>
      </form>
    </div>
  )
}
