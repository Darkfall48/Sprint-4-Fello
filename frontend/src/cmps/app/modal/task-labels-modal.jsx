import { boardReducer } from "../../../store/reducers/board.reducer";
import { FiCheck } from 'react-icons/fi'
import { IoMdCheckbox } from 'react-icons/io'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { RxPencil1 } from 'react-icons/rx'

import { useState } from "react";
import { SetLabels } from "../../board/group/task/cmps/set-labels";


export function TaskLabelsModal({ task, board, onCloseModal, onEditLabels }) {

  const { labelIds } = task
  const labels = board?.labels
  const [filteredLabels, setFilteredLabels] = useState(labels)
  const [inputLabel, setInputLabel] = useState(labels)
  const [updatedLabelIds, setUpdatedLabelIds] = useState(labelIds)

  function onToggleLabel(label) {
    let updatedLabelIds = []
    if (labelIds.includes(label.id)) {
      updatedLabelIds = labelIds.filter(labelId => labelId !== label.id)
    } else {
      updatedLabelIds = labelIds.push(label.id)
    }
    setUpdatedLabelIds(updatedLabelIds)
  }


  function handleChange({ target }) {
    const { value } = target
    setInputLabel(value)
    const regex = new RegExp(value, 'i')
    const filteredLabels = labels.filter((label) => regex.test(label.title))
    setFilteredLabels({ ...filteredLabels, })

  }

  function handleChange({ value }) {
    console.log(value)
  }



  return <section className='modal-content-container'>
    <input type="text" value={inputLabel.title} placeholder="Search labels..." onChange={handleChange} />
    <div className="labels-selection-container">
      {/* <SetLabels type="" board={board} task={task} filteredLabels={filteredLabels} /> */}
      <article className="task-details-main-labels">
        <h2 className="task-details-main-labels-title">Labels</h2>
          {filteredLabels.map((label, idx) => {
            return (
              <div key={idx} id="labels-container-modal">
                <span key={idx+1}>
                  {(labelIds.includes(label.id)) && <IoMdCheckbox />}
                  {(!labelIds.includes(label.id)) && <MdOutlineCheckBoxOutlineBlank />}
                </span>

                <span
                  className="task-details-main-labels-container-label"
                  key={label.id}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                >
                  <div
                    className="task-details-main-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                  ></div>
                  <span key={idx+2} className="task-details-main-labels-container-title">
                    {label?.title ? label?.title : 'None'}
                  </span>
                </span>
                <span key={idx+3}><RxPencil1/></span>
              </div>
            )
          })}
      </article>

    </div >
    <button className='modal-btn-full'>Create a new label</button>
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