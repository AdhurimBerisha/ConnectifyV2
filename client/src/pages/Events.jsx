// Events.jsx
import React from 'react';
import Books from './Books';
import Add from './Add';
import Update from './Update';
import { Route, Routes } from 'react-router-dom';
import "../styles/book.scss";

const Events = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update/:id" element={<Update />} />
            </Routes>
        </div>
    );
};

export default Events;
