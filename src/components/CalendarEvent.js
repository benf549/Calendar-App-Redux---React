import React from 'react';
import "../App.css";
import {DeleteRequest} from "../api"

let CalendarEvent = ({totaltop, totalheight, title, repeator, number, deletefun, showEditEventPopup}) => {
    if (repeator === 0) {
        //The second to nth block that repeats for a repeater.
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', marginTop:'0', borderTopLeftRadius:'0', borderTopRightRadius:'0'}} onClick = {() => {showEditEventPopup(number)}}>
                {/* <p>{title}</p> */}
                <p className="DEB hidex t1" onClick={() => {DeleteRequest(number, deletefun)}}>X</p>
            </div>
        )
    } else if (repeator === 1){
        // First block in a repeator
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
                <p onClick = {() => {showEditEventPopup(number)}}>{title}</p>
                <p className="DEB t2" onClick={() => {DeleteRequest(number, deletefun)}}>X</p>
            </div>
            )
    } else {
        return (
        // Corresponds to events that dont span multiple days or weeks.
        <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'3px', borderBottomRightRadius:'3px'}}>
            <p onClick = {() => {showEditEventPopup(number)}}>{title}</p>
            <p className="DEB t3" onClick={() => {DeleteRequest(number, deletefun)}}>X</p>
        </div>
        )
    }
}

export default CalendarEvent;