//?Libraries
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
//?Services:
import {
  loadBoard,
  updateBoard,
  updateTask,
} from '../../../store/actions/board.actions'
import { boardService } from '../../../services/board/board.service'
import { utilService } from '../../../services/util.service'
import { useEffect, useState } from 'react'

export function TaskLabelsModal({
  task,
  group,
  board,
  onCloseModal,
  onEditLabels,
  onReturnBtn,
}) {
  const [filteredLabels, setFilteredLabels] = useState(board?.labels||[])
  const [inputLabel, setInputLabel] = useState('')
  const [mode, setMode] = useState('select-label')
  const [labelTitle, setLabelTitle] = useState('')
  const [labelColor, setLabelColor] = useState('')
  const [editExisiting, setEditExisting] = useState(false)
  const [active, setActive] = useState(false)
  const [editLabel, setEditLabel] = useState(null)
console.log('board.labels', board)

  async function onToggleLabel(label) {
    const { id } = label
    let updatedLabelIds = []
    if (task.labelIds.includes(id)) {
      updatedLabelIds = task.labelIds.filter((labelId) => labelId !== id)
    } else {
      updatedLabelIds = task.labelIds.concat(id)
    }
    task = { ...task, labelIds: updatedLabelIds }
    try {
      await updateTask(group, task)
      loadBoard(board._id)
    } catch (err) {
      console.log('Failed to update task', err)
    }
  }

  function handleChange({ target }) {
    const { value } = target
    setInputLabel(value)
    const regex = new RegExp(value, 'i')
    const filteredLabels = board.labels.filter((label) =>
      regex.test(label.title)
    )
    console.log('filteredLabels', filteredLabels)
    setFilteredLabels(filteredLabels)
  }

  function selectLabelColor(color) {
    setLabelColor(color)
    setActive(!active)
    console.log('color', color)
  }

  function handleLabelTitleChange({ target }) {
    const { value } = target
    console.log('value', value)
    setLabelTitle(value)
  }

  function createNewLabel() {
    const newLabel = {
      id: utilService.makeId(),
      title: labelTitle,
      color: labelColor,
    }
    const updatedLabels =  board?.labels?.concat(newLabel)
    updateLabelstoBoard(updatedLabels)
    setFilteredLabels(updatedLabels)
  }

  function onToggleMode(mode) {
    setMode(mode)
  }

  async function updateLabelstoBoard(updatedLabels) {
    board = { ...board, labels: updatedLabels }
    setMode('select-label')
    onReturnBtn(false)
    setLabelColor('')
    setLabelTitle('')
    try {
      await updateBoard(board)
      console.log('board._id', board._id)
      loadBoard(board._id)
    } catch (err) {
      console.log('Failed to update board', err)
    }
  }

  function deleteLabel() {
    setEditExisting(false)
    const updatedLabels = board.labels.filter(
      (label) => label.id !== editLabel.id
    )
    setEditLabel(null)
    updateLabelstoBoard(updatedLabels)
    setFilteredLabels(updatedLabels)
  }

  switch (mode) {
    case 'select-label':
      return (
        <section className="modal-content-container">
          <input
            type="text"
            value={inputLabel.title}
            placeholder="Search labels..."
            onChange={handleChange}
          />
          <div className="labels-selection-container">
            <p>Labels</p>
            {filteredLabels?.map((label, idx) => {
              return (
                <div key={idx} id="labels-container-modal">
                  <label
                    htmlFor="color-pick"
                    key={idx}
                    onClick={() => onToggleLabel(label)}
                  >
                    {task.labelIds.includes(label.id) && <IoMdCheckbox />}
                    {!task.labelIds.includes(label.id) && (
                      <MdOutlineCheckBoxOutlineBlank className="black-checkbox" />
                    )}
                  </label>

                  {label?.title && <div
                    className="task-details-main-labels-container-label"
                    id="color-pick"
                    key={label.id}
                    style={{ backgroundColor: label?.color + '66' }}
                    title={label?.title ? label?.title : ''}
                  >
                    <div
                      className="task-details-main-labels-container-circle"
                      style={{ backgroundColor: label?.color }}
                      // key={idx}
                    ></div>
                    <span
                      // key={idx}
                      className="task-details-main-labels-container-title"
                    >
                      {label?.title}
                    </span>
                  </div>}
                  <span
                    // key={idx}
                    onClick={() => {
                      setMode('create-new')
                      onReturnBtn(true)
                      setEditExisting(true)
                      setEditLabel(label)
                    }}
                  >
                    <RxPencil1 />
                  </span>
                </div>
              )
            })}
          </div>
          <button
            id="modal-btn-full-grey"
            onClick={() => {
              setMode('create-new')
              onReturnBtn(true)
            }}
          >
            Create a new label
          </button>
        </section>
      )
      break
    case 'create-new':
      return (
        <div>
          <div className="new-label-demo">
            <div
              className="task-details-main-labels-container-label"
              id="color-pick"
              style={{ backgroundColor: labelColor + '66' }}
              title={labelTitle}
            >
              <div
                className="task-details-main-labels-container-circle"
                style={{ backgroundColor: labelColor }}
              ></div>
              <span className="task-details-main-labels-container-title">
                {labelTitle}
              </span>
            </div>
          </div>
          <p>Title</p>
          <input
            type="text"
            value={labelTitle}
            onChange={handleLabelTitleChange}
          />
          <p>Select a color</p>
          <div className="label-color-selection-container">
            {boardService.getLabelColors().map((color, idx) => {
              const active = editLabel?.color === color ? true : false
              return (
                <button
                  key={idx}
                  onClick={() => selectLabelColor(color)}
                  className="btn-label-color"
                  style={{
                    backgroundColor: color,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    border: active ? 'grey' : '',
                  }}
                ></button>
              )
            })}
          </div>
          <button id="modal-btn-full-grey">
            {' '}
            <span>
              <CgClose />
            </span>{' '}
            Remove color
          </button>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button id="save-btn" onClick={() => createNewLabel()}>
              Create
            </button>
            {editExisiting && (
              <button id="delete-btn" onClick={() => deleteLabel()}>
                Delete
              </button>
            )}
          </div>
        </div>
      )
      break
  }
}
