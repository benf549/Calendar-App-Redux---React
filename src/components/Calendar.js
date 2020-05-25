import React, {useEffect} from 'react';
import "../App.css";

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let hours = ["12 am","1 am","2 am","3 am","4 am","5 am","6 am","7 am","8 am","9 am","10 am","11 am","12 pm","1 pm","2 pm","3 pm","4 pm","5 pm","6 pm","7 pm","8 pm","9 pm","10 pm","11 pm"]



let Daycolumn = (props) => {
    return (
        <div className="daycolumn">
            {hours.map(hour =>  
                (
                    <div 
                    key = {hour}
                    className="grid">
                        <hr></hr>
                    </div>
                )
            )}
        </div>
    );
}



let Calendar = () => {

    //Scroll the calendar to 9 am. Maybe scroll to the current time?
    useEffect(() => {
        var el = document.getElementById("9 am")
        el.scrollIntoView(true)
      }, [])



    return (
        <div className="calbody">
            <div className="spacer">
                {hours.map(hour => (
                    <div 
                    key = {hour}
                    className="spacergrid">
                        <hr></hr>
                        <p id={hour}>{hour}</p>
                    </div>
                ))}
            </div>
            {days.map(day => (
                <Daycolumn
                key = {day}
                day = {day}
                />
            ))}
        </div>
    );
}

export default Calendar;