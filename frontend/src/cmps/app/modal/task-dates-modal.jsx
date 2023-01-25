
import React, { Component, useState } from 'react'
import Calendar from 'react-calendar';


export function TaskDatesModal({ task, group, onCloseModal }) {
    const [value, onChange] = useState(new Date());

    
    return <div>
      <Calendar onChange={onChange} value={value}  />
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