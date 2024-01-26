// bookController.js
import mysqlConnection from '../dbConfig/mysql.js';

const db = mysqlConnection();

export const getAllEvents = (req, res) => {
  const q = 'SELECT * FROM events'; // Change table name to "events"
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Format date before sending the response
    const formattedData = data.map(event => ({
      ...event,
      date: event.date.toISOString().split('T')[0], // Format the date to 'YYYY-MM-DD'
    }));

    return res.json(formattedData);
  });
};

export const addEvent = (req, res) => {
    const q = "INSERT INTO events(`title`, `desc`, `date`, `place`) VALUES (?, ?, ?, ?)"; // Change table name and fields
    const values = [req.body.title, req.body.desc, req.body.date, req.body.place]; // Change field names
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
    });
};

export const deleteEvent = (req, res) => {
    const eventId = req.params.id; // Change variable name
    const q = 'DELETE FROM events WHERE id = ?'; // Change table name
    db.query(q, [eventId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json({ success: true, message: 'Event deleted successfully' });
    });
};

export const updateEvent = (req, res) => {
    const eventId = req.params.id; // Change variable name
    const q = 'UPDATE events SET `title`= ?, `desc`= ?, `date`= ?, `place`= ? WHERE id = ?'; // Change table name and fields
    const values = [req.body.title, req.body.desc, req.body.date, req.body.place]; // Change field names
    db.query(q, [...values, eventId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
    });
};
