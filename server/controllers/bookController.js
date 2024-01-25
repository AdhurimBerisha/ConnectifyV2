// bookController.js
import mysqlConnection from '../dbConfig/mysql.js';

const db = mysqlConnection();

export const getAllBooks = (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

export const addBook = (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?, ?, ?)";
  
    const values = [req.body.title, req.body.desc, req.body.cover];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
    });
};

export const deleteBook = (req, res) => {
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?';
  
    db.query(q, [bookId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json({ success: true, message: 'Book deleted successfully' });
    });
  };

export const updateBook = (req, res) => {
    const bookId = req.params.id;
    const q = 'UPDATE books SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?'; // Removed `price` from the query
  
    const values = [req.body.title, req.body.desc, req.body.cover];
  
    db.query(q, [...values, bookId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
    });
};
