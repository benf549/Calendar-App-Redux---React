import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import CalendarHead from './components/CalendarHead';
import EventSpace from './components/EventSpace';
import CalendarEvent from './components/CalendarEvent';
import NewEventForm from './components/NewEventForm';
import {ParseResponse} from './api'

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

let processedevents = [];

function App() {
  let [fetchagain, setfetchagain] = useState(false)
  processedevents = ParseResponse(fetchagain)
  

  let week = [];
  let weekofevents = [[], [], [], [], [], [], []];

  let [popup, setPopup] = useState(false)
  const showNewEventPopUp = () => {
    setPopup(!popup)
  };
  let testing = "none"
  if (popup === true ){
     testing = "inline-block"
  }


  let [inc, setinc] = useState(0)
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
  if (processedevents) {
  for (let i = 0; i < processedevents.length; i++) {
    let parsedtemp = processedevents[i].eventday;

    //now that the dates in the week have been determined, for every event as called above, we check if the event falls on any date in the current week. 
    for (let z = 0; z < week.length; z++) {
      let day = week[z]
      if ((parsedtemp.getDate() === day.getDate()) && (parsedtemp.getMonth() === day.getMonth()) && (parsedtemp.getFullYear() === day.getFullYear())) {
        //checks if the event its looking at is in the week, on the month, of the year and if it is, checks the overflow array for the same event
          weekofevents[day.getDay()].push(<CalendarEvent key={processedevents[i].key} totaltop={processedevents[i].totaltop} totalheight={processedevents[i].totalheight} title={processedevents[i].title} repeator={processedevents[i].repeator} number={processedevents[i].id} deletefun={setfetchagain}/>)
        } 
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
          <CalendarHead weekdays={week}/>
        </div>
        <div className="lower">
          <div className="scrollcontainercontainer">
            <div className="scrollcontainer">
              <div className="scroller">
                <Calendar />
                <EventSpace weekofevents={weekofevents} />
              </div>
            </div>
          </div>
          <div className="neweventpopup" style={{display:testing}}>
            <div className="topbar">
              <h3>Add A New Event</h3>
              <p className="closepopup" onClick={showNewEventPopUp}>x</p>
            </div>            
          <NewEventForm setfetchagain={setfetchagain} setPopup={setPopup}/>
          </div>
          <div className="neweventcircle" onClick={showNewEventPopUp}>
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
