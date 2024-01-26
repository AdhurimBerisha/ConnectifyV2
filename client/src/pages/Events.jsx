// Events.jsx
import React from 'react';
import AddEvents from './AddEvents';
import { Route, Routes } from 'react-router-dom';
import "../styles/event.scss";

const Events = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AddEvents />} />
            </Routes>
        </div>
    );
};

export default Events;
