import React from 'react';
import "../App.css"



let Day = (param) => {
    return (
        <div className="dayheader" style={ param.td ? {backgroundColor:  "var(--red-accent)", borderRadius : "5px"} : null}>
            <h5>{param.day}</h5>
            <h1>{param.date}</h1>
        </div>
    )
}

let CalendarHead = ({weekdays}) => {
    let days = [];
    let today = new Date();

    for (let i = 0; i < weekdays.length; i++) {

      var daypush = {
        "date": weekdays[i].getDate(),
        "isToday": ((weekdays[i].getDate() === today.getDate()) && (weekdays[i].getMonth() === today.getMonth()) && (weekdays[i].getFullYear() === today.getFullYear())) ? true : false
        }

        var dow;
        switch (i) {
          case 0:
            dow = "Mon";
            break;
          case 1:
            dow = "Tue";
            break;
          case 2:
            dow = "Wed";
            break;
          case 3:
            dow = "Thu";
            break;
          case 4:
            dow = "Fri";
            break;
          case 5:
            dow = "Sat";
            break;
          default:
            dow = "Sun";
            break;
        }
        daypush.day = dow;
        days.push(daypush)
      }

    return(
        <div className="dayheadercontainer">
            <div className="spacer"></div>
            {days.map(item => (
                <Day 
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