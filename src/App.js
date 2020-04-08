import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';
import CalendarEvent from './CalendarEvent'

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

let events = [{ "id": 1, "name": "General Physics II for Biology Majors", "time": "12 April 2020 09:00:00 EDT", "ends": "16 April 2020 09:50:00 EDT" }, { "id": 2, "name": "Organic Chemistry Lecture", "time": "07 April 2020 10:00:00 EDT", "ends": "07 April 2020 10:50:00 EDT" }];

//!test
let temppp = [];
for (let t = 0; t < events.length; t++) {
  //could probably turn this into a function to simplify
  let parsed = new Date(Date.parse(events[t].time));
  let hourtop = parsed.getHours() * 6.25;
  let minutetop = parsed.getMinutes() * 0.104167;
  let totaltop = hourtop + minutetop;
  let parsed2 = new Date(Date.parse(events[t].ends));
  let msbetween = Math.abs(parsed2 - parsed);
  let minbetweenheight = (msbetween / 60000) * 0.104167;

  let test = (minbetweenheight + totaltop) - 150;
  if (test > 0) {
    temppp.push({"key":events[t].id, "totaltop":totaltop, "totalheight":(150-totaltop), "title":events[t].name, "originalday":events[t].time, "daysafter":0})
    let cnt = 1
    while (test > 0){
      temppp.push({"key":events[t].id*test, "totaltop":0, "totalheight":test > 150 ? 150 : test, "title":events[t].name, "originalday":events[t].time, "daysafter":new Date(parsed.getTime()+(864E5*cnt))})
      cnt += 1
      test -= 150
    }
  } else {
    temppp.push({"key":events[t].id, "totaltop":totaltop, "totalheight":minbetweenheight, "title":events[t].name, "originalday":events[t].time, "daysafter":0})
  }
}

console.log(temppp)
//!test

function App() {

  let week = [];
  let weekofevents = [[], [], [], [], [], [], []];
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
  const sayHello = () => console.log("Hello There");


  // going through each event in the event dictionary and checking if the event date (event.time) is the same date as a day in the week array.
  for (let i = 0; i < temppp.length; i++) {
    let parsedtemp = new Date(Date.parse(temppp[i].originalday));
    let eventday = parsedtemp.getDate();
    let overflowday = temppp[i].daysafter;


    //now that the dates in the week have been determined, for every event as called above, we check if the event falls on any date in the current week. 
    for (let z = 0; z < week.length; z++) {
      let day = week[z]
      if ((eventday === day.getDate()) && (parsedtemp.getMonth() === day.getMonth()) && (parsedtemp.getFullYear() === day.getFullYear())) {
        //checks if the event its looking at is in the week, on the month, of the year and if it is, checks the overflow array for the same event
        weekofevents[day.getDay()].push(<CalendarEvent key={temppp[i].id} totaltop={temppp[i].totaltop} totalheight={temppp[i].totalheight} title={temppp[i].title} />)
      }
      if (overflowday != 0 && ((overflowday.getDate() === day.getDate()) && (overflowday.getMonth() === day.getMonth()) && (overflowday.getFullYear() === day.getFullYear())) ) {
        weekofevents[day.getDay()].push(<CalendarEvent key={temppp[i].id} totaltop={temppp[i].totaltop} totalheight={temppp[i].totalheight} title={temppp[i].title} />)
      }
    }
  }




  return (
    <div className="App">
      <div className="leftbutton" onClick={deincrement}><i className="fas fa-chevron-left"></i></div>
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
          <div className="neweventcircle" onClick={sayHello}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="rightbutton" onClick={increment}><i className="fas fa-chevron-right"></i></div>

    </div>
  );
}

export default App;
