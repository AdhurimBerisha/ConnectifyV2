// BooksTable.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/event.scss";

const AddEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    desc: "",
    date: "",
    place: "",
  });
  const [updateEvent, setUpdateEvent] = useState({
    id: null,
    title: "",
    desc: "",
    date: "",
    place: "",
  });
  const [error, setError] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const navigate = useNavigate();

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8800/api/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (isUpdateMode) {
      setUpdateEvent((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
      }));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
      }));
    }
  };

  const handleAddEvent = async () => {
    try {
      await axios.post("http://localhost:8800/api/events", newEvent);
      setNewEvent({
        title: "",
        desc: "",
        date: "",
        place: "",
      });
      setShowAddForm(false);
      setError(false);

      
      fetchAllEvents();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`http://localhost:8800/api/events/${updateEvent.id}`, updateEvent);
      setUpdateEvent({
        id: null,
        title: "",
        desc: "",
        date: "",
        place: "",
      });
      setIsUpdateMode(false);
      setShowAddForm(false);
      setError(false);

      
      fetchAllEvents();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setIsUpdateMode(false);
  };

  const toggleUpdateForm = (event) => {
    setUpdateEvent({
      id: event.id,
      title: event.title,
      desc: event.desc,
      date: event.date,
      place: event.place,
    });
    setShowAddForm(true);
    setIsUpdateMode(true);
  };

  return (
    <div>
      <h1>Welcome to Events</h1>

      <div key="events-table" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {events.map((event) => (
          <div className="book-widget" key={`event-${event.id || "undefined"}`}>
            <h3>{event.title}</h3>
            <p>{event.desc}</p>
            <p>
              <span>Date:</span> {event.date}
            </p>
            <p>
              <span>Place:</span> {event.place}
            </p>
            <div className="actions" key={`actions-${event.id}`}>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
              <button
                onClick={() => toggleUpdateForm(event)}
                style={{ backgroundColor: '#2196f3', color: 'white' }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="form" key="add-form" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>{isUpdateMode ? "Update Event" : "Add New Event"}</h2>
          <input
            type="text"
            placeholder="Event title"
            name="title"
            value={isUpdateMode ? updateEvent.title : newEvent.title}
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Event desc"
            name="desc"
            value={isUpdateMode ? updateEvent.desc : newEvent.desc}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="YY/MM/DD"  
            name="date"
            value={isUpdateMode ? updateEvent.date : newEvent.date}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Event place"
            name="place"
            value={isUpdateMode ? updateEvent.place : newEvent.place}
            onChange={handleChange}
          />
          <button
            key={isUpdateMode ? "update-event" : "add-event"}
            onClick={isUpdateMode ? handleUpdateEvent : handleAddEvent}
          >
            {isUpdateMode ? "Update" : "Add"}
          </button>
          {error && <div key="error" className="error">Something went wrong!</div>}
        </div>
      )}

      <button key={`toggle-add-form-${showAddForm}`} className="addHome" onClick={toggleAddForm}>
        {showAddForm ? "Cancel" : "Add new event"}
      </button>
    </div>
  );
};

export default AddEvents;
