import React from 'react';
import {ParseFetchData} from '../api/todo';

const ToDoEvent = ({name, time, priority, iscomplete}) => {

    return (
        <div className="todoitem">
            <p>{name}</p>
            <p>{time.toLocaleString()}</p>
            <p>{priority}</p>
            <p>{iscomplete ? "true" : "false"}</p>
        </div>
    )
}

const InWeekTDView = ({dayClicked, week}) => {
    let data = ParseFetchData(false)

    let dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

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
            <p>{dayClicked}</p>
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