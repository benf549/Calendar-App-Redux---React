import React from 'react';
import "../App.css"



let Day = (param) => {
    return (
        <div className="dayheader">
            <h5>{param.day}</h5>
            <h1>{param.date}</h1>
        </div>
    )
}

let CalendarHead = ({weekdays}) => {
    let days = []

    for (let i = 0; i < weekdays.length; i++) {
        switch (i) {
          case 0:
            days.push({
              "day": "Mon",
              "date": weekdays[0].getDate()
            })
            break;
          case 1:
            days.push({
              "day": "Tue",
              "date": weekdays[1].getDate()
            })
            break;
          case 2:
            days.push({
              "day": "Wed",
              "date": weekdays[2].getDate()
            })
            break;
          case 3:
            days.push({
              "day": "Thu",
              "date": weekdays[3].getDate()
            })
            break;
          case 4:
            days.push({
              "day": "Fri",
              "date": weekdays[4].getDate()
            })
            break;
          case 5:
            days.push({
              "day": "Sat",
              "date": weekdays[5].getDate()
            })
            break;
          default:
            days.push({
              "day": "Sun",
              "date": weekdays[6].getDate()
            })
            break;
        }
      }

    return(
        <div className="dayheadercontainer">
            <div className="spacer"></div>
            {days.map(item => (
                <Day 
                key={item.date}
                day={item.day}
                date={item.date}
                />
            ))}
        </div>
    )
}



export default CalendarHead;