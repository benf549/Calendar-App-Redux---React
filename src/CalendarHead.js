import React from 'react';
import "./App.css"

let days = [{"day" :"Mon", "date" : 6}, {"day" :"Tue", "date" : 7}, {"day" :"Wed", "date" : 8}, {"day" :"Thu", "date" : 9}, {"day" :"Fri", "date" : 10}, {"day" :"Sat", "date" : 11}, {"day" :"Sun", "date" : 12}]

let Day = (param) => {
    return (
        <div className="dayheader">
            <h5>{param.day}</h5>
            <h1>{param.date}</h1>
        </div>
    )
}

let CalendarHead = () => {
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