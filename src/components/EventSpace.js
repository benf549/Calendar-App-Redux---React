import React from 'react';
//import CalendarEvent from './CalendarEvent';
import '../App.css';

let days = [1, 2, 3, 4, 5, 6, 0]


let EventGrid = ({weekofevents, day}) => {

    return (
        <div className="eventgrid">
            {weekofevents[day].map(item => (
                item
            ))}
        </div>
    )
}

let EventSpace = ({weekofevents}) => {
    return (
        <div className="eventspace">
            <div className="spacer">
            </div>
            {days.map(day => (
                <div
                    key={day}
                    className="eventunit"
                    id={day}>
                    <EventGrid
                        weekofevents={weekofevents}
                        key={day}
                        day={day}
                    />
                    <div className="displayspacer">
                    </div>
                </div>
            ))}
        </div>
    )
}


export default EventSpace;