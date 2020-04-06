import React from 'react';
import "./App.css";

let CalendarEvent = ({totaltop, totalheight, title}) => {

    return (
        <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh'}}>
            <p>{title}</p>
        </div>
    )

}

export default CalendarEvent;