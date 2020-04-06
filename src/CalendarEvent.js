import React from 'react';
import "./App.css";

// let CalendarEvent = ({time, title, day, ends}) => {

//     let parsed = new Date(Date.parse(time));

//     let hourtop = parsed.getHours() * 6.25;
//     let minutetop = parsed.getMinutes() * 0.104167;
//     let totaltop = hourtop + minutetop;

//     let parsed2 = new Date(Date.parse(ends));
//     let msbetween = Math.abs(parsed2-parsed);
//     let minbetweenheight = (msbetween/60000)*0.104167;

//     if (totaltop + minbetweenheight >= 150) {
//         let overflowheight = (totaltop + minbetweenheight) - 150;

//         return (
//             <div className="Event" style={{top:totaltop+'vh', height:(minbetweenheight-overflowheight)+'vh'}}>
//                 <p>{title}</p>
//             </div>
//         )
//     } else {
//         return (
//             <div className="Event" style={{top:totaltop+'vh', height:minbetweenheight+'vh'}}>
//                 <p>{title}</p>
//             </div>
//        )
//     }
// }

let CalendarEvent = ({totaltop, totalheight, title}) => {

    return (
        <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh'}}>
            <p>{title}</p>
        </div>
    )

}

export default CalendarEvent;