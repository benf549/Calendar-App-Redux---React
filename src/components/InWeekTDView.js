import React from 'react';
import {ParseFetchData} from '../api/todo';

const ToDoEvent = ({name, time, priority, iscomplete}) => {

    return (
        <div className="todoitem">
            <div className="markoff" style={priority === 5 ? {backgroundColor:"rgba(255,0,0,0.3)", boxShadow: "inset 0 0 1vw var(--red-accent)"} : {backgroundColor:"rgba(0,0,0,0.3)", boxShadow: "inset 0 0 1vw black"}}></div>
            <div className="belowtodoitem"> 
                <h4 style={{color : iscomplete ? "grey" : "black"}}>{name}</h4>
                <p id="todotime">{`${time.getHours() > 12 ? (time.getHours - 12) : (time.getHours() === 0) ? 12 : time.getHours()}:${time.getMinutes()}${time.getHours() > 11 ? "pm" : "am"}`}</p>
            </div>            
        </div>
    )
}

const InWeekTDView = ({dayClicked, week}) => {
    let data = ParseFetchData(false)

    let dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let fulldow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let weekind;
    if(dayClicked){
        for (let day = 0; day < dow.length; day++) {
            if (dayClicked === dow[day]) {
                weekind = day;
            }
        }
    }
    
    return(
        <div>
            <h3 className="dayofweek">{fulldow[weekind]}</h3>
            {data.map(item => {
                if ((dayClicked) && (item.time.getDate() === week[weekind].getDate()) && (item.time.getMonth() === week[weekind].getMonth()) && (item.time.getFullYear() === week[weekind].getFullYear())){
                    return <ToDoEvent key={item.id} name={item.name} time={item.time} priority={item.priority} iscomplete={item.iscomplete}/>
                } else {
                    return null
                }
            })}
        </div>
    )

}

export default InWeekTDView;