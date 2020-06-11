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

//  function useTest() {
//      const [height, setHeight] = useState(0);
//      const ref2 = useRef(null);
  
//      const handleMouseOver = (prop) => setHeight(prop);
//      const handleMouseOut = () => setHeight(0);

//      useEffect(
//        () => {
//          const node = ref2.current;
//          if (node) {
//            node.addEventListener('mouseover', handleMouseOver(node.clientHeight));
//            node.addEventListener('mouseout', handleMouseOut);
  
//            return () => {
//              node.removeEventListener('mouseover', handleMouseOver);
//              node.removeEventListener('mouseout', handleMouseOut);
//            };
//          }
//        },
//        //[ref2.current] // Recall only if ref changes
//      );
  
//      return [ref2, height];
//    }

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

    const handleenter= () => {
      setHeight2(ref2.current.clientHeight)
      console.log(height2)
    }

    const handleexit = () => {
      setHeight2(0)
      console.log(height2)
    }

 
    const Testt = {
          "--hovered-element-height" : `${height2 > totalheight*0.01*height ? height2 : totalheight *0.01*height}px`
    }

     if (height2) {
         console.log(height2)
         console.log(`Window Height:${height}px \nElement Height in px: ${totalheight*0.01*height} \nTextelementHeight=${height2}`)
         document.documentElement.style.setProperty("--hovered-element-height", Testt["--hovered-element-height"]);
     }
                    

    
    if (repeator === 0) {
        //The second to nth block that repeats for a repeater.
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', marginTop:'0', borderTopLeftRadius:'0', borderTopRightRadius:'0'}} onClick = {() => {showEditEventPopup(number)}}>
                {/* <p>{title}</p> */}
            </div>
        )
    } else if (repeator === 1){
        // First block in a repeator
        return (
            <div className="Event" style={{top:totaltop+'vh', height:totalheight+'vh', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
                <p className = "eventtitle" onClick = {() => {showEditEventPopup(number)}}>{title}</p>
                <p className="DEB t2" onClick={() => {DeleteRequest(number, deletefun)}}>X</p>
            </div>
            )
    } else {
        return (
        // Corresponds to events that dont span multiple days or weeks.
        <div  className="Event" style={{zIndex:"3", top:totaltop+'vh', height:totalheight+"vh", borderBottomLeftRadius:'3px', borderBottomRightRadius:'3px'}}>
            <p className = "eventtitle" ref={ref2} onMouseEnter={handleenter} onMouseLeave={handleexit} onClick = {() => {showEditEventPopup(number)}}>{title}</p>
            <p className="DEB t3" onClick={() => {DeleteRequest(number, deletefun)}}>X</p>
        </div>
        )
    }
}

export default CalendarEvent;