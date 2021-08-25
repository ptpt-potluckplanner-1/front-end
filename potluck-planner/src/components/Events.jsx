import React from "react";

function Events(props) {
  const { eventslist } = props;
  console.log("eventslist", eventslist);
  return (
    <div className="App" data-testid="events">
      {eventslist.map((item) => (
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
