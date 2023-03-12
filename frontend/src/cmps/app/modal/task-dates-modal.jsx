
import React, { Component, useState } from 'react'
import Calendar from 'react-calendar';
import Datepicker from 'react-calendar';
import { updateTask } from '../../../store/actions/board.actions';

export function TaskDatesModal({ task, group, onCloseModal }) {

  const [value, onChange] = useState(new Date());

  function changeDueDate() {
    task.dueDate = value
    task.dueDate = task.dueDate.getTime()
    console.log('task.dueDate', task.dueDate);
    updateTask(group, task)
    console.log('task.dueDate', task.dueDate);
  }

  return <div>
    <Datepicker 
    onChange={onChange} 
    onClickDay={changeDueDate} 
    onFocus 
    value={value}
    marked={[
      { 
          date: Date.now(), 
          color: '#46c4f3'
      }]}
    // tileClassName={({ date}) => {
    //   let today = date.getDate()
    //   if(new Date===date){
    //     console.log('date', date)
    //    return  'highlight'
    //   }
    // }}
    />
  <p id='due-date-btn'>Due date</p>
  {/* <input type="text" className="due-date-input" value={value.toLocaleDateString()} contentEditable={false} 
    autoFocus
    onFocus={e => e.currentTarget.select()}
  /> */}
  <div className="due-date-input">
  {value.toLocaleDateString()}
  </div>
  </div>
}




// import { DatePicker } from 'react-dater'
// import 'react-dater/dist/index.css'
// const [dates, setDates] = useState({ checkin: new Date('2022-03-28'), checkout: new Date('2022-04-28') })
// const [open, setOpen] = useState(false)
{/* <DatePicker
dates={dates}
setDates={setDates}
open={open}
setOpen={setOpen}
>
<button onClick={() => setOpen(!open)}>
    {dates.checkin && dates.checkin.toDateString()} |{' '}
    {dates.checkout && dates.checkout.toDateString()}
</button>
</DatePicker> */}