import React, {useState} from "react"
import "../App.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {PostData} from "../api"


function NewEventForm({setfetchagain}) {
    const [newName, setNewName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    let handleClick = (e) => {
      e.preventDefault();
      if (newName === "") {
        alert("Hey! Name can't be blank!")
      } else if ((endDate.getTime() - startDate.getTime()) < 0){
        alert("Hey! End date can't be before start date")
      } else {
        let start = startDate.getTime()
        let end = endDate.getTime()
        //refresh api call?
        PostData({newName, start, end, setfetchagain})
      }
    }


     return (
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={newName} onChange={e => setNewName(e.target.value)}/>
        <label htmlFor="date">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="Start Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        <label htmlFor="date">End Date</label>

          <DatePicker
            selected={endDate}
            minDate={startDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="End Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        <button type="submit" onClick={handleClick}>Test</button>
      </form>
     )
}

export default NewEventForm