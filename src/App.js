import React, {useState} from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';

//date needs to be equal a string exactly 1 week +/- the current Date().
let updateDays = (newweekdate = null) => {
  let curr;
  if (newweekdate===null) {
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
  
  return(temp)

}


function App() {

  let [week, setWeek] = useState([])
  let [inc, setinc]=useState(0)
  if (inc==0){
    week = updateDays();
  } else {
    week = [];
    let tempDate = new Date();
    let weekinms = 7*24*60*60*1000;
    week = updateDays(tempDate.getTime()+weekinms)
  }

  let increment = () => {
    setinc(inc+1)
  }
  //want to use this syntax to change what week it is. Hook? The week is an empty array by default but we can set it to something with the update days function. 
  //const sayHello = () => console.log("Hello There");


  let events = [{ "id": 1, "name": "General Physics II for Biology Majors", "time": "12 April 2020 09:00:00 EDT", "ends": "13 April 2020 09:50:00 EDT" }, { "id": 2, "name": "Organic Chemistry Lecture", "time": "03 April 2020 10:00:00 EDT", "ends": "03 April 2020 10:50:00 EDT" }];

  return (
    <div className="App">
      <div className="content">
        <div className="upper">
          <CalendarHead weekdays={week}/>
        </div>
        <div className="lower">
          <div className="scrollcontainercontainer">
            <div className="scrollcontainer">
              <div className="scroller">
                <Calendar />
                <EventSpace eventlist={events} week={week}/>
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
