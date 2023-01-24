import { boardReducer } from "../../../store/reducers/board.reducer";
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'

import { useState } from "react";
import { loadBoard, updateTask } from "../../../store/actions/board.actions";


export function TaskLabelsModal({ task, group, board, onCloseModal, onEditLabels }) {

  const labels = board?.labels
  const [filteredLabels, setFilteredLabels] = useState(labels)
  const [inputLabel, setInputLabel] = useState(labels)
  const [createLabelMode, setCreateLabelMode] = useState(false)

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
      console.log('Failed to change task member', err)
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

  return <section className='modal-content-container'>
    <input type="text" value={inputLabel.title} placeholder="Search labels..." onChange={handleChange} />
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
    <button onClick={() => { setCreateLabelMode(true)} }>Create a new label</button>
  </section >
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