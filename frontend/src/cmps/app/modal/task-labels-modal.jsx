//?Libraries
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
//?Services:
import { loadBoard, updateBoard, updateTask } from "../../../store/actions/board.actions";
import { boardService } from "../../../services/board/board.service.local";
import { utilService } from "../../../services/util.service";
import { useEffect, useState } from "react";


export function TaskLabelsModal({ task, group, board, onCloseModal, onEditLabels }) {

  const labels = board?.labels
  const [filteredLabels, setFilteredLabels] = useState(labels)
  const [inputLabel, setInputLabel] = useState(labels)
  const [mode, setMode] = useState('select-label')
  const [labelTitle, setLabelTitle] = useState('')
  const [labelColor, setLabelColor] = useState('')
  const [editExisiting,setEditExisting] = useState(false)
  // const [updatedBoard,setUpdatedBoard] = useState(board)

  // useEffect(()=>{
  //   loadBoard()
  // },[updatedBoard])


  async function onToggleLabel(label) {
    const { id } = label
    let updatedLabelIds = []
    if (task.labelIds.includes(id)) {
      updatedLabelIds = task.labelIds.filter(labelId => labelId !== id)
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
    const filteredLabels = labels.filter((label) => regex.test(label.title))
    console.log('filteredLabels', filteredLabels)
    setFilteredLabels(filteredLabels)
  }

  function selectLabelColor(color) {
    setLabelColor(color)
    console.log('color', color)
  }

  function handleLabelTitleChange({ target }) {
    const { value } = target
    console.log('value', value)
    setLabelTitle(value)
  }

  async function createNewLabel() {
    const newLabel = { id: utilService.makeId(), title: labelTitle, color: labelColor }
    const updatedLabels = board.labels.concat(newLabel)
      board = { ...board, labels: updatedLabels }
      setMode('select-label')
      try {
        // const savedBoard = await updateBoard(board)
        await updateBoard(board)
        console.log('board._id', board._id)
        loadBoard(board._id)
        // setUpdatedBoard(savedBoard)
      } catch (err) {
        console.log('Failed to update board', err)
      }

  }

  function deleteLabel(){
    setEditExisting(false)

  }

  switch (mode) {
    case 'select-label':

      return (<section className='modal-content-container'>
        < input type="text" value={inputLabel.title} placeholder="Search labels..." onChange={handleChange} />
        <div className="labels-selection-container">
          {/* <SetLabels type="" board={board} task={task} filteredLabels={filteredLabels} /> */}
          <p>Labels</p>
          {filteredLabels.map((label, idx) => {
            return (
              <div key={idx} id="labels-container-modal">
                <label
                  htmlFor="color-pick"
                  key={idx + 1}
                  onClick={() => onToggleLabel(label)}
                >
                  {(task.labelIds.includes(label.id)) && <IoMdCheckbox />}
                  {(!task.labelIds.includes(label.id)) && <MdOutlineCheckBoxOutlineBlank className="black-checkbox" />}
                </label>

                <span
                  className="task-details-main-labels-container-label"
                  id="color-pick"
                  key={label.id}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                >
                  <div
                    className="task-details-main-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                    key={idx + 3}
                  ></div>
                  <span key={idx + 4} className="task-details-main-labels-container-title">
                    {label?.title ? label?.title : 'None'}
                  </span>
                </span>
                <span key={idx + 5} onClick={()=> {
                  setMode('create-new')
                  setEditExisting(true)}}><RxPencil1 /></span>
              </div>
            )
          })}
        </div >
        <button onClick={() => { setMode('create-new') }}>Create a new label</button>
      </section >
      )
      break
    case 'create-new':
      return (
        <div>
          <p>Title</p>
          <input type="text" value={labelTitle} onChange={handleLabelTitleChange} />
          <p>Select a color</p>
          <div className="label-color-selection-container">
            {boardService.getLabelColors().map((color, idx) => {
              return <button key={idx} onClick={() => selectLabelColor(color)} className="btn-label-color" style={{ backgroundColor: color }}></button>
            })}
          </div>
          <button> <span><CgClose /></span> Remove color</button>
          <button onClick={() => createNewLabel()}>Create</button>
          {editExisiting && <button onClick={()=>deleteLabel()}>Delete</button>}
        </div>

      )
      break
  }
}
