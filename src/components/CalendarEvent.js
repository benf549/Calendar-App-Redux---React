import React, {useState, useEffect, useRef} from 'react';
import "../App.css";
import {DeleteRequest} from "../api";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

//Window size functions return the height of the window so that I can convert vh to px. This special function is for this to be responsive.
  export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}


let CalendarEvent = ({totaltop, totalheight, title, repeator, number, deletefun, showEditEventPopup, startDT, stopDT}) => {
    const {height} = useWindowDimensions();
    const [height2, setHeight2] = useState(0);
    const ref2 = useRef(null);
    const starttime = new Date(parseInt(startDT));
    const stoptime = new Date(parseInt(stopDT));

    //calculate the start date as a string
    var startmonth = starttime.getMonth() === 0 ? 1 : starttime.getMonth() + 1; 
    var endmonth = stoptime.getMonth() ===  0 ? 1 : stoptime.getMonth() + 1;

    var startday = starttime.getDate()
    var endday =  stoptime.getDate()

    //Calculate start time for Event 
    var starthour
    if(starttime.getHours() > 12) {
      starthour = `${starttime.getHours() - 12}:${starttime.getMinutes() === 0 ? "00" : starttime.getMinutes()}pm`
    } else {
      starthour = `${starttime.getHours() === 0 ? "12" : starttime.getHours()}:${starttime.getMinutes() === 0 ? "00" : starttime.getMinutes()}am`
    }

    //Calculate the end time for the Event
    var endhour
    if(stoptime.getHours() > 12) {
      endhour = `${stoptime.getHours() - 12}:${stoptime.getMinutes() === 0 ? "00" : stoptime.getMinutes()}pm`
    } else {
      endhour = `${stoptime.getHours() === 0 ? "12" : stoptime.getHours()}:${stoptime.getMinutes() === 0 ? "00" : stoptime.getMinutes()}am`
    }

    //runs when the mouse enters an event ovject on the screen. Sets the height2 variable equal to the height of the eventtitle object.
    const handleenter = () => {
      setHeight2(ref2.current.childNodes[0].clientHeight)
    }
    //runs when the mouse leaves an event on the screen. Resets height2 to zero.
    const handleexit = () => {
      setHeight2(0)
    }
 
    useEffect(()=>{
      const Testt = {"--hovered-element-height" : `${height2 > totalheight*0.01*height ? height2 : totalheight *0.01*height}px`}
      document.documentElement.style.setProperty("--hovered-element-height", Testt["--hovered-element-height"]);
    },[height2, height, totalheight])
    
    
    if (repeator === 0) {
        //The second to nth block that repeats for a repeater.
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', marginTop:'0', borderTopLeftRadius:'0', borderTopRightRadius:'0'}} onClick = {() => {showEditEventPopup(number)}}>
            </div>
        )
    } else if (repeator === 1){
        // First block in a repeator
        return (
            <div className="Event hoverexpand" ref={ref2} onMouseOver={handleenter} onMouseOut={handleexit} style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
              <div className="nameandtimewrapper" onClick = {() => {showEditEventPopup(number)}}>
                <p className = "eventtitle" >{title}</p>
                <p className="timerange">{`${starthour}-${endhour}`}</p>
                <p className="timerange">{`${startmonth}/${startday}-${endmonth}/${endday}`}</p>
              </div>
                <span className="DEB t2" onClick={() => {DeleteRequest(number, deletefun)}}><i className="fas fa-times"></i></span>
            </div>
            )
    } else {
        return (
        // Corresponds to events that dont span multiple days or weeks.
        <div  className="Event hoverexpand" ref={ref2} onMouseOver={handleenter} onMouseOut={handleexit} style={{zIndex:"3", top:totaltop+'vh', height:totalheight+"vh", borderBottomLeftRadius:'3px', borderBottomRightRadius:'3px'}}>
            <div className="nameandtimewrapper" onClick = {() => {showEditEventPopup(number)}}>
              <p className = "eventtitle">{title}</p>
              <p className="timerange">{`${starthour}-${endhour}`}</p>
            </div>
            <span className="DEB t3" onClick={() => {DeleteRequest(number, deletefun)}}><i className="fas fa-times"></i></span>
            
        </div>
        )
    }
}

export default CalendarEvent;