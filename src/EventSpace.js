import React from 'react';
import CalendarEvent from './CalendarEvent';
import './App.css';

let days = [1, 2, 3, 4, 5, 6, 0]
let test = [[], [], [], [], [], [], []]


let EventGrid = ({ eventlist, day, test }) => {

    for (let i = 0; i < eventlist.length; i++) {
        let parsed = new Date(Date.parse(eventlist[i].time));

        let eventday = parsed.getDay();

        let hourtop = parsed.getHours() * 6.25;
        let minutetop = parsed.getMinutes() * 0.104167;
        let totaltop = hourtop + minutetop;

        let parsed2 = new Date(Date.parse(eventlist[i].ends));
        let msbetween = Math.abs(parsed2 - parsed);
        let minbetweenheight = (msbetween / 60000) * 0.104167;

        if (eventday === day) {

            if (totaltop + minbetweenheight > 150) {
                let overflowheight = (totaltop + minbetweenheight) - 150;
                test[day].push(<CalendarEvent key={eventlist[i].id} totaltop={totaltop} totalheight={minbetweenheight - overflowheight} title={eventlist[i].name} />)
                switch (day) {
                    case 6:

                        //this doesnt work because monday has already been drawn at this point. Howver, realistically this doesnt matter, we just want it to go to the next day so need to conver the list to use Date objects rather than simple indices

                        test[0].push(<CalendarEvent key={eventlist[i].id} totaltop={0} totalheight={overflowheight} title={eventlist[i].name} />)
                        break
                    default:
                        test[day + 1].push(<CalendarEvent key={eventlist[i].id} totaltop={0} totalheight={overflowheight} title={eventlist[i].name} />)
                        break
                }

            } else {
                test[day].push(<CalendarEvent key={eventlist[i].id} totaltop={totaltop} totalheight={minbetweenheight} title={eventlist[i].name} />)

            }

        } else {
            continue;
        }
    }
    return (
        <div className="eventgrid">
            {test[day].map(item => (
                item
            ))}

        </div>
    )


}

console.log(test)

let EventSpace = ({ eventlist }) => {
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
                    key={day}
                    className="eventunit"
                    id={day}>

                    <EventGrid
                        test={test}
                        eventlist={eventlist}
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