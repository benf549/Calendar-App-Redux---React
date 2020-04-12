import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';
import CalendarEvent from './CalendarEvent'
import NewEventForm from './NewEventForm'

let updateDays = (newweekdate = null) => {
  //This function takes in a day or nothing (to get current week) and returns an array of the days of the current week which is later stored into the 'week' array
  let curr;
  if (newweekdate === null) {
    curr = new Date();
  } else {
    curr = new Date(newweekdate);
  }
  let temp = [];
  let daynum;
  switch (curr.getDay()) {
    case 0:
      daynum = 6;
      break;
    default:
      daynum = curr.getDay() - 1;
      break;
  }
  let first = curr.getDate() - daynum;

  let firstday = new Date(curr.setDate(first));
  for (let i = 0; i <= 6; i++) {
    switch (i) {
      case 0:
        temp.push(firstday);
        break
      default:
        let lastday = new Date(curr.setDate(curr.getDate() + 1));
        temp.push(lastday);
        break
    }
  }

  return (temp)

}

let events = [{ "id": 1, "name": "General Physics II for Biology Majors", "time": "11 April 2020 09:00:00 EDT", "ends": "12 April 2020 09:50:00 EDT" }, { "id": 2, "name": "Organic Chemistry Lecture", "time": "07 April 2020 10:00:00 EDT", "ends": "07 April 2020 10:50:00 EDT" }];
//initialize new processedevents array to treat events that overflow a day as a new event
//!could use this to duplicate events that repeat as well?
let processedevents = [];

for (let t = 0; t < events.length; t++) {
  //calculate the height of each event and if the height of the event+distance from top is > 150 vh, we push it into the array and trim height, then for the number of times the 
  let parsed = new Date(Date.parse(events[t].time));
  let hourtop = parsed.getHours() * 6.25;
  let minutetop = parsed.getMinutes() * 0.104167;
  let totaltop = hourtop + minutetop;
  let parsed2 = new Date(Date.parse(events[t].ends));
  let msbetween = Math.abs(parsed2 - parsed);
  let minbetweenheight = (msbetween / 60000) * 0.104167;

  let overflow = (minbetweenheight + totaltop) - 150;
  //calculate the overflow of the event
  if (overflow > 0) {
    //if there is an overflow trim the original event and push it into the array
    processedevents.push({ "key": events[t].id, "totaltop": totaltop, "totalheight": (150 - totaltop), "title": events[t].name, "eventday": parsed, "repeator" : 1})
    let cnt = 1
    //while the overflow is > 0, push the event into an array, if its >150vh, trim it and set its day to be 24hrs after the original event. the number of times through the while loop sets number of days to add to event.
    while (overflow > 0) {
      processedevents.push({ "key": events[t].id * overflow, "totaltop": 0, "totalheight": overflow > 150 ? 150 : overflow, "title": events[t].name, "eventday": new Date(parsed.getTime() + (864E5 * cnt)), "repeator" : 0})
      cnt += 1
      overflow -= 150
    }
  } else {
    //if there is no overflow, just push the event into the array wuthout changing it and add calculated top and height distances. 
    processedevents.push({ "key": events[t].id, "totaltop": totaltop, "totalheight": minbetweenheight, "title": events[t].name, "eventday": parsed })
  }
}

function App() {

  let week = [];
  let weekofevents = [[], [], [], [], [], [], []];
  //test
  let [test, setTest] = useState(false)
  const sayHello = () => {
    setTest(!test)
  };
  let testing = "none"
  if (test === true ){
     testing = "inline-block"
  }
  //test


  let [inc, setinc] = useState(0)
  //!this function adds a week to the week array
  week = updateDays();

  let tempDate = new Date();
  let daynum;
  //this allows sunday to be the last index in the array rather than the first. 
  switch (tempDate.getDay()) {
    case 0:
      daynum = 6;
      break;
    default:
      daynum = tempDate.getDay() - 1;
      break;
  }

  //daynum just gives the day of the week
  let dayforadd = week[daynum];
  week = [];
  let weekinms = 7 * 24 * 60 * 60 * 1000;
  week = updateDays(dayforadd.getTime() + (weekinms * inc))

  //!want to use this syntax to change what week it is. Hook? The week is an empty array by default but we can set it to something with the update days function. 
  let increment = () => {
    setinc(inc + 1)
  }
  let deincrement = () => {
    setinc(inc - 1)
  }


  // going through each event in the event dictionary and checking if the event date (event.time) is the same date as a day in the week array.
  for (let i = 0; i < processedevents.length; i++) {
    let parsedtemp = processedevents[i].eventday;

    //now that the dates in the week have been determined, for every event as called above, we check if the event falls on any date in the current week. 
    for (let z = 0; z < week.length; z++) {
      let day = week[z]
      if ((parsedtemp.getDate() === day.getDate()) && (parsedtemp.getMonth() === day.getMonth()) && (parsedtemp.getFullYear() === day.getFullYear())) {
        //checks if the event its looking at is in the week, on the month, of the year and if it is, checks the overflow array for the same event
          weekofevents[day.getDay()].push(<CalendarEvent key={processedevents[i].key} totaltop={processedevents[i].totaltop} totalheight={processedevents[i].totalheight} title={processedevents[i].title} repeator={processedevents[i].repeator} />)
        } 
      }
    }


  let month;
  switch (week[0].getMonth()) {
    case 0:
      month = "January"
      break;
    case 1:
      month = "February"
      break;
    case 2:
      month = "March"
      break;
    case 3:
      month = "April"
      break;
    case 4:
      month = "May"
      break;
    case 5:
      month = "June"
      break;
    case 6:
      month = "July"
      break;
    case 7:
      month = "August"
      break;
    case 8:
      month = "September"
      break;
    case 9:
      month = "October"
      break;
    case 10:
      month = "November"
      break;
    default:
      month = "December"
      break;
  }
  let monthyear = `${month} ${week[0].getFullYear()}`;


  return (
    <div className="App">
      <div className="topmostwrapper">
      <div className="leftbutton" onClick={deincrement}><i className="fas fa-chevron-left"></i></div>
      <div className="content">
        <div className="upper">
          <h2 id="month">{monthyear}</h2>
          <CalendarHead weekdays={week} />
        </div>
        <div className="lower">
          <div className="scrollcontainercontainer">
            <div className="scrollcontainer">
              <div className="scroller">
                <Calendar />
                <EventSpace events={events} weekofevents={weekofevents} />
              </div>
            </div>
          </div>
          <div className="neweventpopup" style={{display:testing}}>
            <div className="topbar">
              <h3>Add a New Event</h3>
              <p onClick={sayHello}>x</p>
            </div>            
          <NewEventForm/>
          </div>
          <div className="neweventcircle" onClick={sayHello}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="rightbutton" onClick={increment}><i className="fas fa-chevron-right"></i></div>
      </div>
    </div>
  );
}

export default App;
