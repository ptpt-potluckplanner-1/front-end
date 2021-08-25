import React from 'react';
import {Link} from 'react-router-dom';

function Events(props) {
    console.log('props.eventslist',props.eventslist)
  return (
    <div className="App">
        {props.eventslist.map(item=>(
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