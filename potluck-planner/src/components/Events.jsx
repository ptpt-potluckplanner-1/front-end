import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Events() {
    // console.log('props.eventslist',props.eventslist)

    const [eventslist, setEventslist] = useState([]);

    useEffect(()=>{
      axios
      .get("https://potluckplanner-backend.herokuapp.com/api/potluck/")
      .then(response => {
        setEventslist(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    },[]);

  return (
    <div className="App">
      <h4> Check ongoing events</h4>
        {eventslist.map(item=>(
                <div key={item.id}>
                    <h1>{item.eventname}</h1>
                    <p>{item.location}</p>
                    <p>{item.date}</p>
                </div>
             ))}
    </div>
  );
}

export default Events;