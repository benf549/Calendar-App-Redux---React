import React, {useState} from "react"
import "./App.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

let NewEventForm = () => {
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
      console.log(newName);
      console.log(startDate.getTime());
      console.log(endDate.getTime());
      }
    }

     return (
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={newName} onChange={e => setNewName(e.target.value)}/>
        <label htmlFor="date">Start Date</label>
          <DatePicker
            id = "date"
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
        <label htmlFor="date">End Date</label>

          <DatePicker
            id = "enddate"
            selected={endDate}
            onChange={date => setEndDate(date)}
          />
        <button type="submit" onClick={handleClick}>Test</button>
      </form>
     )
}

export default NewEventForm