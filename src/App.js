import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';
import CalendarEvent from './CalendarEvent'

//!date needs to be equal a string exactly 1 week +/- the current Date().
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
  console.log(temp)

  return (temp)

}

function App() {

  let week = [];
  let weekofevents = [[], [], [], [], [], [], []];
  let [inc, setinc] = useState(0)
//!this function adds a week to the week array
  week = updateDays();

  if (inc === 0) {
  } else {
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
    // week array is empty?
    let dayforadd = week[daynum];
    console.log(week)
    week = [];
    let weekinms = 7 * 24 * 60 * 60 * 1000;
    week = updateDays(dayforadd.getTime() + weekinms)
  }

  //!want to use this syntax to change what week it is. Hook? The week is an empty array by default but we can set it to something with the update days function. 
  let increment = () => {
    setinc(inc + 1)
  }
  //const sayHello = () => console.log("Hello There");
  let events = [{ "id": 1, "name": "General Physics II for Biology Majors", "time": "14 April 2020 09:00:00 EDT", "ends": "14 April 2020 09:50:00 EDT" }, { "id": 2, "name": "Organic Chemistry Lecture", "time": "07 April 2020 10:00:00 EDT", "ends": "07 April 2020 10:50:00 EDT" }];

  //Here i am going through each event in the event dictionary and checking if the event date (event.time) is the same date as a day in the week array.
  //!goign to need to check if month and eventually year is the same as well to handle events between different years and months
  
  for (let i = 0; i < events.length; i++) {
    // i is each event
    let parsed = new Date(Date.parse(events[i].time));
    //parsed is a date object created based on the date of the event
    let eventday = parsed.getDate();
    //numerical date (eg. 15th, 31st, 1, ...) of the parsed object

    //calculate the distance from the top of the eventgrid the event should be
    let hourtop = parsed.getHours() * 6.25;
    let minutetop = parsed.getMinutes() * 0.104167;
    let totaltop = hourtop + minutetop;

    //calculate the height of the event on the grid
    let parsed2 = new Date(Date.parse(events[i].ends));
    let msbetween = Math.abs(parsed2 - parsed);
    let minbetweenheight = (msbetween / 60000) * 0.104167;


    for (let z = 0; z < week.length; z++) {
      // loop iterates through the week array and each 'z' corresponds to the day of the week.
      let day = week[z]
      // if the date of the event calculated by the loop of 'i' is equal to the the date of the day of the week that we're iterating with 'z'
      if (eventday === day.getDate()) {

        //checks if the event is going to overflow the event grid (height + distance from the top are > 150vh)

        //!doesnt work for multiple overflows. only one. 
        //doesnt work for sunday->monday overflow.
        if (totaltop + minbetweenheight > 150) {
          let overflowheight = (totaltop + minbetweenheight) - 150;
          weekofevents[day.getDay()].push(<CalendarEvent key={events[i].id} totaltop={totaltop} totalheight={minbetweenheight - overflowheight} title={events[i].name} />)
          switch (day) {
            case 6:
              //need to create a temporary array to hold this overflow and push it into the (next week's or previous week's) week of events. 
              weekofevents[0].push(<CalendarEvent key={events[i].id} totaltop={0} totalheight={overflowheight} title={events[i].name} />)
              break
            default:
              weekofevents[day.getDay() + 1].push(<CalendarEvent key={events[i].id} totaltop={0} totalheight={overflowheight} title={events[i].name} />)
              break
          }

        } else {
          weekofevents[day.getDay()].push(<CalendarEvent key={events[i].id} totaltop={totaltop} totalheight={minbetweenheight} title={events[i].name} />)
        }
        // just continues the loop of the event isnt on the day of the week were looking at. 
      } else {
        continue;
      }
    }
  }

  console.log(weekofevents)

  return (
    <div className="App">
      <div className="content">
        <div className="upper">
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
          <div className="neweventcircle" onClick={increment}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
