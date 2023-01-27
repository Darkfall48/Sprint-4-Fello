//?Libraries
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
//?Services:
import {
  loadBoard,
  removeLabelFromAllTasks,
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
  mode,
  onToggleMode
}) {
  const [filteredLabels, setFilteredLabels] = useState(board?.labels || [])
  const [inputLabel, setInputLabel] = useState('')
  const [labelTitle, setLabelTitle] = useState('')
  const [labelColor, setLabelColor] = useState('')
  const [editExisiting, setEditExisting] = useState(false)
  const [editLabel, setEditLabel] = useState({ color: '#DFE1E6', title: '' })
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
    setEditLabel((prevEditLabel) => ({ ...prevEditLabel, color }))
    // setLabelColor(color)
    console.log('color', color)
  }

  function handleLabelTitleChange({ target }) {
    const { value } = target
    console.log('value', value)
    setEditLabel((preEditLabel) => ({ ...preEditLabel, title: value }))
  }

  function createNewLabel() {
    const newLabel = {
      id: utilService.makeId(),
      title: editLabel.title,
      color: editLabel.color,
    }
    console.log('newLabel', newLabel)
    const updatedLabels = board?.labels?.concat(newLabel)
    console.log('updatedLabels', updatedLabels)
    updateLabelstoBoard(updatedLabels)
    setFilteredLabels(updatedLabels)
  }

  async function updateLabelstoBoard(updatedLabels) {
    board = { ...board, labels: updatedLabels }
    onToggleMode('select-label')
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

  async function deleteLabel() {
    setEditExisting(false)
    const updatedLabels = board.labels.filter(
      (label) => label.id !== editLabel.id)
    const updatedLabelIds = task.labelIds.filter(
      (labelId) => labelId !== editLabel.id)
    task = { ...task, labelIds: updatedLabelIds }
    try {
      // await updateTask(group, task)
      await removeLabelFromAllTasks (board, editLabel.id)
      await updateLabelstoBoard(updatedLabels)
      setEditLabel(null)
      setFilteredLabels(updatedLabels)
    } catch(err){
      console.log('Failed to remove label', err)
    }
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
                <div key={idx} id="labels-container-modal"
                  onClick={() => onToggleLabel(label)}>
                  <label
                    key={idx}
                  >
                    {task.labelIds.includes(label.id) && <IoMdCheckbox />}
                    {!task.labelIds.includes(label.id) && (
                      <MdOutlineCheckBoxOutlineBlank className="black-checkbox" />
                    )}
                  </label>

                  {label?.title && <div
                    className="task-details-main-labels-container-label"
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
                      id="color-pick"
                    >
                      {label?.title}
                    </span>
                  </div>}
                  <span
                    // key={idx}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      onToggleMode('create-new')
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
            onClick={(ev) => {
              ev.stopPropagation()
              onToggleMode('create-new')
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
              style={{ backgroundColor: editLabel.color ? editLabel.color + '66' : 'grey' }}
              title={editLabel?.title}
            >
              <div
                className="task-details-main-labels-container-circle"
                style={{ backgroundColor: editLabel.color ? editLabel.color : 'grey' }}
              ></div>
              <span className="task-details-main-labels-container-title">
                {editLabel?.title || ''}
              </span>
            </div>
          </div>
          <p>Title</p>
          <input
            type="text"
            value={editLabel.title}
            placeholder={editLabel?.title || ''}
            onChange={handleLabelTitleChange}
          />
          <p>Select a color</p>
          <div className="label-color-selection-container">
            {boardService.getLabelColors().map((color, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => selectLabelColor(color)}
                  className="btn-label-color"
                  style={{
                    backgroundColor: color,
                  }}
                ></button>
              )
            })}
          </div>
          <button id="modal-btn-full-grey"
            onClick={() => selectLabelColor('')}
          >
            {' '}
            <span style={{ margin: '4px 3px 0 0' }}>
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
