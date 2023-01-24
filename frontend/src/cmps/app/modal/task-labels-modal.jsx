import { boardReducer } from "../../../store/reducers/board.reducer";
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'

import { useState } from "react";
import { loadBoard, updateBoard, updateTask } from "../../../store/actions/board.actions";
//?Services:
import { boardService } from "../../../services/board/board.service.local";
import { utilService } from "../../../services/util.service";


export function TaskLabelsModal({ task, group, board, onCloseModal, onEditLabels }) {

  const labels = board?.labels
  const [filteredLabels, setFilteredLabels] = useState(labels)
  const [inputLabel, setInputLabel] = useState(labels)
  const [mode, setMode] = useState('select-label')
  const [labelTitle, setLabelTitle] = useState('')
  const [labelColor, setLabelColor] = useState('')

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
      loadBoard()
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
        await updateBoard(board)
        loadBoard()
      } catch (err) {
        console.log('Failed to update board', err)
      }

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
                  ></div>
                  <span key={idx + 2} className="task-details-main-labels-container-title">
                    {label?.title ? label?.title : 'None'}
                  </span>
                </span>
                <span key={idx + 3}><RxPencil1 /></span>
              </div>
            )
          })}
        </div >
        <button onClick={() => { setMode('edit-new') }}>Create a new label</button>
      </section >
      )
      break
    case 'edit-new':
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
        </div>

      )
      break
  }
}





// <article className="task-details-main-labels">
//     {updatedLabelIds.map((label, idx) => {
//       return (
//         <label className="task-label-selection-wrapper"
//           key={idx}
//           onClick={() => onToggleLabel(label)}
//         >
//           {/* <input type="checkbox" /> */}
//           {(labelIds.includes(label.id)) && <span><IoMdCheckbox /></span>}
//           {(!labelIds.includes(label.id)) && <span><MdOutlineCheckBoxOutlineBlank /></span>}
//           <div
//             className="task-label-selection"
//             key={label?.id}
//             style={{ backgroundColor: label?.color }}
//             title={label?.title ? label?.title : 'None'}
//           >
//             <div
//               className="task-details-main-labels-container-circle"
//               style={{ backgroundColor: label?.color }}
//             ></div>

//             <span>{label.title}</span>
//           </div>
//         </label>
//       )
//     })}
//   </article>

{/* {labelIds.map((labelId, idx) => {
      const label = labels.find((label) => label.id === labelId)
      return (
        <span
          className="task-label-selection"
          key={idx}
          style={{ backgroundColor: label?.color }}
          title={label?.title ? label?.title : 'None'}
        >{label?.title}</span>
      )
    })} */}