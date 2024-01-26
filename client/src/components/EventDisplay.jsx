// EventDisplay.jsx
import React from "react";

const EventDisplay = ({ events }) => {
  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
      <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
        <span>Upcoming Events</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="flex items-center justify-between" key={event._id}>
              <p>{event.title}</p>
              <p>{event.desc}</p>
              <p>{event.date}</p>
              <p>{event.place}</p>
            </div>
          ))
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default EventDisplay;
