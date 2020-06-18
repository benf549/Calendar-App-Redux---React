import React, {useEffect} from 'react';
import FetchData from '../api/todo';

const ToDoEvent = ({name, time}) => {

    return (
        <div className="todoitem">
            <p>{name}</p>
            <p>{time}</p>
        </div>
    )
}

const InWeekTDView = ({dayClicked}) => {
    
    let data = FetchData(false)

    useEffect(() => {
        console.log(dayClicked)
    }, [dayClicked])

    
    return(
        <div>
            <p>{dayClicked}</p>
            {data.map(item => {
                return <ToDoEvent key={item.id} name={item.name} time={item.time}/>
            })}
        </div>
    )

}

export default InWeekTDView;