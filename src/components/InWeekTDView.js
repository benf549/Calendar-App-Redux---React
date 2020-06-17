import React from 'react';
import FetchData from '../api/todo';

const ToDoEvent = ({name, time}) => {

    return (
        <div className="todoitem">
            <p>{name}</p>
            <p>{time}</p>
        </div>
    )
}

const Righttdwindow = () => {
    
    let data = FetchData(false)
    
    return(
        <div>
            <p>To Do Window</p>
            {data.map(item => {
                return <ToDoEvent key={item.id} name={item.name} time={item.time}/>
            })}
        </div>
    )

}

export default Righttdwindow;