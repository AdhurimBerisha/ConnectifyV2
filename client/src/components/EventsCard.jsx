import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils"; // Import the apiRequest function

const EventsCard = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const response = await apiRequest({
        url: '/api/events', // Adjust the endpoint if needed
        method: 'GET',
      });

      console.log('Response:', response);

      if (response.status === 'failed') {
        console.error(response);
      } else {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    getAllEvents(); // Fetch events when the component mounts
  }, []);

  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]">
          <span>Events</span>
          <span>{events ? events.length : 0}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div className="w-full flex gap-4 items-center" key={`event-${event.id || "undefined"}`}>
                <div className="flex-1">
                  <p className="text-base font-medium text-ascent-1">{event.title}</p>
                  <p className="text-ascent-2">{event.desc}</p>
                  <p className="text-ascent-2">
                    <span>Date:</span> {event.date}
                  </p>
                  <p className="text-ascent-2">
                    <span>Place:</span> {event.place}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-ascent-2">No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
