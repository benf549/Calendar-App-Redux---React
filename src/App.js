import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';
import CalendarEvent from './CalendarEvent'

//date needs to be equal a string exactly 1 week +/- the current Date().
let updateDays = (newweekdate = null) => {
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

  if (inc === 0) {
    week = updateDays();
  } else {
    let tempDate = new Date();
    let daynum;
    switch (tempDate.getDay()) {
      case 0:
        daynum = 6;
        break;
      default:
        daynum = tempDate.getDay() - 1;
        break;
    }
    let dayforadd = week[daynum];
    week = [];
    let weekinms = 7 * 24 * 60 * 60 * 1000;
    week = updateDays(dayforadd.getTime() + weekinms)
  }

  let increment = () => {
    setinc(inc + 1)
  }
  //want to use this syntax to change what week it is. Hook? The week is an empty array by default but we can set it to something with the update days function. 
  //const sayHello = () => console.log("Hello There");
  let events = [{ "id": 1, "name": "General Physics II for Biology Majors", "time": "13 April 2020 09:00:00 EDT", "ends": "14 April 2020 09:50:00 EDT" }, { "id": 2, "name": "Organic Chemistry Lecture", "time": "07 April 2020 10:00:00 EDT", "ends": "07 April 2020 10:50:00 EDT" }];

  //test
  for (let i = 0; i < events.length; i++) {
    let parsed = new Date(Date.parse(events[i].time));

    let eventday = parsed.getDate();

    let hourtop = parsed.getHours() * 6.25;
    let minutetop = parsed.getMinutes() * 0.104167;
    let totaltop = hourtop + minutetop;

    let parsed2 = new Date(Date.parse(events[i].ends));
    let msbetween = Math.abs(parsed2 - parsed);
    let minbetweenheight = (msbetween / 60000) * 0.104167;


    for (let z = 0; z < week.length; z++) {
      let day = week[z]
      console.log(day)

      if (eventday === day.getDate()) {
        if (totaltop + minbetweenheight > 150) {
          let overflowheight = (totaltop + minbetweenheight) - 150;
          weekofevents[day.getDay()].push(<CalendarEvent key={events[i].id} totaltop={totaltop} totalheight={minbetweenheight - overflowheight} title={events[i].name} />)
          switch (day) {
            case 6:
              //this doesnt work because monday has already been drawn at this point. Howver, realistically this doesnt matter, we just want it to go to the next day so need to conver the list to use Date objects rather than simple indices
              weekofevents[0].push(<CalendarEvent key={events[i].id} totaltop={0} totalheight={overflowheight} title={events[i].name} />)
              break
            default:
              weekofevents[day.getDay() + 1].push(<CalendarEvent key={events[i].id} totaltop={0} totalheight={overflowheight} title={events[i].name} />)
              break
          }

        } else {
          weekofevents[day.getDay()].push(<CalendarEvent key={events[i].id} totaltop={totaltop} totalheight={minbetweenheight} title={events[i].name} />)

        }

      } else {
        continue;
      }
    }
  }
  //end test

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
