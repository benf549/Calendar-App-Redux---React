import React, {useState, useEffect} from 'react';
import '../App.css';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {PutRequest} from "../api";

let EditPopup = ({eventforedit, eventlist, hidepopup, refresh, editevent}) => {

    const [newName, setNewName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        var test = eventlist ? eventlist.find(obj => {return obj.id === eventforedit}) : "";
        var titleforedit = test ? test.title : "";
        var startforedit = test ? new Date(parseInt(test.ostarted)) : new Date();
        var endforedit = test ? new Date (parseInt(test.oended)) : new Date();

        setNewName(titleforedit);
        setStartDate(startforedit);
        setEndDate(endforedit);
    }, [eventforedit, eventlist])

    useEffect(() => {
      const handleEsc = (event) => {
          if (editevent && event.keyCode === 27) {
            hidepopup();
            console.log("closed")
          }
      };
      window.addEventListener('keydown', handleEsc);
  
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, [editevent, hidepopup]);


    let handleClick = (e) => {
        e.preventDefault();
        if (newName === "") {
          alert("Hey! Name can't be blank!");
        } else if ((endDate.getTime() - startDate.getTime()) < 0){
          alert("Hey! End date can't be before start date");
        } else {
          let start = startDate.getTime();
          let end = endDate.getTime();

            PutRequest(eventforedit, newName, start, end, refresh);

            setNewName('');
            setStartDate(new Date());
            setEndDate(new Date());
            hidepopup();
        }
    }

    return(
        <form>

        <div className="inputlayout">
        <label htmlFor="name">Name</label>
        <div className="NameContainer">
        <input type="text" id="name" value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        </div>


        <div className="inputlayout">
        <label htmlFor="date">Start Date</label>
        <div className="testwrap">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="Start Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        </div>

        <div className="inputlayout">
        <label htmlFor="date">End Date</label>
          <div className="testwrap">
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
          </div>
        </div>

        <button className="finalsubmit" type="submit" onClick={handleClick}>Submit</button>
      </form>

    )

}

export default EditPopup;