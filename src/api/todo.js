import {useState, useEffect} from 'react';

const URL = 'http://localhost:5000/todo_database';
let firstRender = true;


export default function FetchData(fetchagain) {
    const [special, setSpecial] = useState([]);
    useEffect(() => {
      let doFetch = async () => {
        try {
          const response = await fetch(URL);
          const json = await response.json();
          console.log(json)
          setSpecial(json)
        } catch (e) {
          console.log(`There was an error in fetching from api... \n ${e}`)
        }
      }
  
      if (fetchagain || (firstRender) ){
        console.log("api fetch just ran")
        doFetch()
      }
    },[fetchagain])
    return special;
  }
