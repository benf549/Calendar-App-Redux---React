import React from 'react';

const ToDoEvent = () => {

    return (
        <div className="todoitem">
            <p>Time</p>
            <p>Name</p>
        </div>
    )
}

const Righttdwindow = () => {

    
    return(
        <div>
            <p>To Do Window</p>
            <ToDoEvent/>
            <ToDoEvent/>
            <ToDoEvent/>
            <ToDoEvent/>
            <ToDoEvent/>
            <ToDoEvent/>
            <ToDoEvent/>        
        </div>
    )

}

export default Righttdwindow;