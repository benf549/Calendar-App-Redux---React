import React from 'react';
import './App.css';
import Calendar from './Calendar';
import CalendarHead from './CalendarHead';
import EventSpace from './EventSpace';

function App() {
  const sayHello = () => console.log("Hello There");
  let events = [{"id":1, "name":"General Physics II for Biology Majors", "time":"12 April 2020 09:00:00 EDT", "ends": "13 April 2020 09:50:00 EDT"}, {"id":2, "name":"Organic Chemistry Lecture", "time":"03 April 2020 10:00:00 EDT", "ends": "03 April 2020 10:50:00 EDT"}];
  return (
    <div className="App">
      <div className="content">
        <div className="upper">
            <CalendarHead />
        </div>
        <div className="lower">
          <div className="scrollcontainercontainer">
            <div className="scrollcontainer">
            <div className="scroller">
              <Calendar />
              <EventSpace eventlist={events}/>
            </div>
            </div>
          </div>
          <div className="neweventcircle" onClick={sayHello}>
          <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
