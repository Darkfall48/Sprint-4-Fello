//?Libraries
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
//?Services:
import { loadBoard, removeLabelFromAllTasks, updateBoard, updateTask} from '../../../store/actions/board.actions'
import { utilService } from '../../../services/util.service'
import { useState } from 'react'
import { taskService } from '../../../services/board/task.service'

export function TaskLabelsModal({ task, group, board, mode, onToggleMode }) {
  const [filteredLabels, setFilteredLabels] = useState(board?.labels || [])
  const [inputLabel, setInputLabel] = useState('')
  const [editExisiting, setEditExisting] = useState(false)
  const [editLabel, setEditLabel] = useState({ id: utilService.makeId(), color: '#f3f5f7', title: '' })

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
    setFilteredLabels(filteredLabels)
  }

  function selectLabelColor(color) {
    setEditLabel((prevEditLabel) => ({ ...prevEditLabel, color }))
  }

  function handleLabelTitleChange(ev) {
    const { value } = ev.target
    setEditLabel((preEditLabel) => ({ ...preEditLabel, title: value }))
    if (ev.key === 'Enter') {
      editExisiting ? updateExisitingLabel() : createNewLabel()
    }
  }

  function createNewLabel() {
    const newLabel = {
      id: utilService.makeId(),
      title: editLabel.title,
      color: editLabel.color,
    }
    const updatedLabels = board?.labels?.concat(newLabel)
    updateLabelstoBoard(updatedLabels)
    setFilteredLabels(updatedLabels)
  }
  function updateExisitingLabel() {
    const labelIdx = board.labels.findIndex(label => label.id === editLabel.id)
    let { labels } = board
    labels?.splice(labelIdx, 1, editLabel)
    updateLabelstoBoard(labels)
    setFilteredLabels(labels)
  }

  async function updateLabelstoBoard(updatedLabels) {
    board = { ...board, labels: updatedLabels }
    onToggleMode('select-label')
    try {
      await updateBoard(board)
      await loadBoard(board._id)
    } catch (err) {
      console.log('Failed to update board', err)
    }
  }

  async function deleteLabel() {
    setEditExisting(false)
    const updatedLabels = board?.labels.filter(
      (label) => label.id !== editLabel?.id)
    const updatedLabelIds = task.labelIds?.filter(
      (labelId) => labelId !== editLabel?.id)
    task = { ...task, labelIds: updatedLabelIds }
    try {
      await updateTask(group, task)
      await removeLabelFromAllTasks(board, editLabel?.id)
      await updateLabelstoBoard(updatedLabels)
      setEditLabel({ id: utilService.makeId(), color: '#f3f5f7', title: '' })
      setFilteredLabels(updatedLabels)
    } catch (err) {
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
                <div key={label.id + idx} id="labels-container-modal"
                  onClick={() => onToggleLabel(label)}>
                  <label
                  // key={idx}
                  >
                    {task.labelIds.includes(label.id) && <IoMdCheckbox />}
                    {!task.labelIds.includes(label.id) && (
                      <MdOutlineCheckBoxOutlineBlank className="black-checkbox" />
                    )}
                  </label>

                  {label?.title && <div
                    // key={idx}
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
              setEditExisting(false)
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
              style={{
                backgroundColor: editLabel.color ? editLabel.color + '66' : '#dfe1e6',
                pointerEvents: 'none'
              }}
              title={editLabel?.title}
            >
              <div
                className="task-details-main-labels-container-circle"
                style={{ backgroundColor: editLabel.color ? editLabel.color : '#dfe1e6' }}
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
            onKeyUp={handleLabelTitleChange}
          />
          <p>Select a color</p>
          <div id="label-color-selection-container">
            {taskService.getLabelColors().map((color, idx) => {
              return (
                <button
                  key={color + idx}
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

            {!editExisiting && (<button id="save-btn" onClick={() => createNewLabel()}>Create</button>)}
            {editExisiting && (<button id="save-btn" onClick={() => updateExisitingLabel()}>Save</button>)}

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
