import React from 'react';
import "./App.css";

let CalendarEvent = ({totaltop, totalheight, title, repeator}) => {
    if (repeator === 0) {
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', marginTop:'0', borderTopLeftRadius:'0', borderTopRightRadius:'0'}}>
                <p>{title}</p>
            </div>
        )
    } else if (repeator === 1){
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
                <p>{title}</p>
            </div>
            )
    } else {
        return (
        <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'3px', borderBottomRightRadius:'3px'}}>
            <p>{title}</p>
        </div>
        )
    }
}

export default CalendarEvent;