import React, {useEffect} from 'react';
import "../App.css";

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]



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

    //Scroll the calendar to 8am. Maybe scroll to the current time?
    useEffect(() => {
        var el = document.getElementById("8am")
        el.scrollIntoView(true)
      }, [])



    return (
        <div className="calbody">
            <div className="spacer">
                {hours.map(hour => (
                    <div 
                    key = {hour}
                    className="grid">
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