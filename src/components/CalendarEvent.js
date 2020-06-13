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


let CalendarEvent = ({totaltop, totalheight, title, repeator, number, deletefun, showEditEventPopup}) => {
    const {height} = useWindowDimensions();
    const [height2, setHeight2] = useState(0);
    const ref2 = useRef(null);
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
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
              <div className="nameandtimewrapper" onClick = {() => {showEditEventPopup(number)}}>
                <p className = "eventtitle" >{title}</p>
                <p className="timerange">04/07/2000-05/07/2000</p>
                <p className="timerange">9:00am-9:30am</p>
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
              <p className="timerange">9:00am-9:30am</p>
            </div>
            <span className="DEB t3" onClick={() => {DeleteRequest(number, deletefun)}}><i className="fas fa-times"></i></span>
            
        </div>
        )
    }
}

export default CalendarEvent;