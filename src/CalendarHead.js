import React from 'react';
import "./App.css"


let curr = new Date()
let week = []
let days = []


let updateDays = () => {

    let testday;
    switch (curr.getDay()) {
        case 0:
            testday = 6;
            break;
        default:
            testday = curr.getDay() - 1;
            break;
    }
    let first = curr.getDate() - testday; 

    let firstday = new Date(curr.setDate(first)).getDate();
    for (let i = 0; i <= 6; i++) {
        switch (i) {
            case 0:
                week.push(firstday);
                break
            default:
                let lastday = new Date(curr.setDate(curr.getDate()+1)).getDate();
                week.push(lastday);
                break
        }
    }
    console.log("week:" + week)      
      for (let i = 0; i < week.length; i++) {
          switch (i) {
              case 0:
                  days.push({
                  "day" : "Mon",
                  "date" : week[0]
                  })
                  break;
              case 1:
                  days.push({
                  "day" : "Tue",
                  "date" : week[1]
                  })
                  break;            
              case 2:
                  days.push({
                  "day" : "Wed",
                  "date" : week[2]
                  })
                  break;
              case 3:
                  days.push({
                  "day" : "Thu",
                  "date" : week[3]
                  })
                  break;
              case 4:
                  days.push({
                  "day" : "Fri",
                  "date" : week[4]
                  })
                  break;
              case 5:
                  days.push({
                  "day" : "Sat",
                  "date" : week[5]
                  })
                  break;
              default:
              days.push({
                  "day" : "Sun",
                  "date" : week[6]
                  })
                  break;
          }
      }
      
}

let Day = (param) => {
    return (
        <div className="dayheader">
            <h5>{param.day}</h5>
            <h1>{param.date}</h1>
        </div>
    )
}

let CalendarHead = () => {
    updateDays()
    return(
        <div className="dayheadercontainer">
            <div className="spacer"></div>
            {days.map(item => (
                <Day 
                key={item.day}
                day={item.day}
                date={item.date}
                />
            ))}
        </div>
    )
}



export default CalendarHead;