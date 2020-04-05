import React from 'react';
import CalendarEvent from './CalendarEvent';
import './App.css';

let days = [1, 2, 3, 4, 5, 6, 0]
let test = [[], [], [], [], [], [], []]    


let EventGrid = ({eventlist, day, test}) => {


     eventlist.forEach(item => {
         let parsed = new Date(Date.parse(item.time));
         let eventday = parsed.getDay();
         console.log(eventday)
         console.log(day)
         if (eventday === day){
             test[day].push(<CalendarEvent day={day} key={item.id} time={item.time} ends={item.ends} title={item.name}/>)
         } else {

        }
    })

    console.log(test)

    return (
    <div className="eventgrid">
        {test[day].map(item => (
            item
    ))}

    </div>
   )


}

let EventSpace = ({eventlist}) => {
    console.log(eventlist)
    eventlist.forEach(item => {
        console.log(item);
    });
    return (
        <div className="eventspace">
            {}        
            <div className="spacer">
            </div>
            {days.map(day => (
                
                <div 
                key = {day}
                className="eventunit" 
                id = {day}>

                <EventGrid
                test = {test}
                eventlist = {eventlist}
                key = {day}
                day = {day}
                />

                    <div className="displayspacer">
                    </div>
                </div>
            ))}     
        </div>
    )
}


export default EventSpace;