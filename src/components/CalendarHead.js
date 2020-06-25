import React from 'react';
import "../App.css"



let Day = ({day, date, td, selectForShowTask}) => {
    return (
      // If today is a date in the calendar head, then show a red rectangle around it as an indicator. 
        <div className="dayheader" onClick={() => {selectForShowTask(day)}} style={ td ? {backgroundColor:  "var(--red-accent)", borderRadius : "5px 5px 0 0", border : "1px solid #ba4b6b"} : null}>
            <h5>{day}</h5>
            <h1>{date}</h1>
        </div>
    )
}

let CalendarHead = ({weekdays, selectForShowTask}) => {
    let days = [];
    let today = new Date();

    for (let i = 0; i < weekdays.length; i++) {

      var daypush = {
        "date": weekdays[i].getDate(),
        "isToday": ((weekdays[i].getDate() === today.getDate()) && (weekdays[i].getMonth() === today.getMonth()) && (weekdays[i].getFullYear() === today.getFullYear())) ? true : false
      }
      //Sets the day of the week
      const dsow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      var dow = dsow[i]
      daypush.day = dow;
      days.push(daypush)
    }

    return(
        <div className="dayheadercontainer">
            <div className="spacer"></div>
            {days.map(item => (
                <Day
                selectForShowTask={selectForShowTask} 
                key={item.date}
                day={item.day}
                date={item.date}
                td={item.isToday}
                />
            ))}
        </div>
    )
}



export default CalendarHead;