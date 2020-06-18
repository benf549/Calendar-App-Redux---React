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


export function ParseFetchData(fetchagain) {
  let processedtodos = [];
  let response = FetchData(fetchagain)

  if (response.length) {
    if (firstRender) {
      firstRender = false
    }
    for (let t = 0; t < response.length; t++) {
      let parsedtime = new Date(parseInt(response[t].time))
      processedtodos.push({id:response[t].id, time:parsedtime, name:response[t].name, priority:response[t].priority, iscomplete:response[t].iscomplete})
    }
  }

  return processedtodos
}
