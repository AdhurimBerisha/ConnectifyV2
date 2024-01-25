// BooksTable.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/book.scss";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [updateBook, setUpdateBook] = useState({
    id: null,
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const navigate = useNavigate();

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8800/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (isUpdateMode) {
      setUpdateBook((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
      }));
    } else {
      setNewBook((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value,
      }));
    }
  };

  const handleAddBook = async () => {
    try {
      await axios.post("http://localhost:8800/api/books", newBook);
      setNewBook({
        title: "",
        desc: "",
        price: null,
        cover: "",
      });
      setShowAddForm(false);
      setError(false);

      // Refetch the data to update the books list
      fetchAllBooks();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleUpdateBook = async () => {
    try {
      await axios.put(`http://localhost:8800/api/books/${updateBook.id}`, updateBook);
      setUpdateBook({
        id: null,
        title: "",
        desc: "",
        price: null,
        cover: "",
      });
      setIsUpdateMode(false);
      setShowAddForm(false); // Toggle off the form after updating
      setError(false);
  
      // Refetch the data to update the books list
      fetchAllBooks();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setIsUpdateMode(false); // Reset update mode when toggling forms
  };

  const toggleUpdateForm = (book) => {
    setUpdateBook({
      id: book.id,
      title: book.title,
      desc: book.desc,
      price: book.price,
      cover: book.cover,
    });
    setShowAddForm(true);
    setIsUpdateMode(true);
  };

  return (
    <div>
      <h1>Welcome to Events</h1>

      <div key="books-table" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {books.map((book) => (
          <div className="book-widget" key={`book-${book.id || "undefined"}`}>
            <h3>{book.title}</h3>
            <p>{book.desc}</p>
            <p>
              <span>Price:</span> {book.price}
            </p>
            <p>
              <span>Cover:</span> {book.cover}
            </p>
            <div className="actions" key={`actions-${book.id}`}>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
              <button onClick={() => toggleUpdateForm(book)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="form" key="add-form" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>{isUpdateMode ? "Update Book" : "Add New Book"}</h2>
          <input
            type="text"
            placeholder="Book title"
            name="title"
            value={isUpdateMode ? updateBook.title : newBook.title}
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Book desc"
            name="desc"
            value={isUpdateMode ? updateBook.desc : newBook.desc}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Book price"
            name="price"
            value={isUpdateMode ? updateBook.price || "" : newBook.price || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Book cover"
            name="cover"
            value={isUpdateMode ? updateBook.cover : newBook.cover}
            onChange={handleChange}
          />
          <button
            key={isUpdateMode ? "update-book" : "add-book"}
            onClick={isUpdateMode ? handleUpdateBook : handleAddBook}
          >
            {isUpdateMode ? "Update" : "Add"}
          </button>
          {error && <div key="error" className="error">Something went wrong!</div>}
        </div>
      )}

      <button key={`toggle-add-form-${showAddForm}`} className="addHome" onClick={toggleAddForm}>
        {showAddForm ? "Cancel" : "Add new book"}
      </button>

    </div>
  );
};

export default BooksTable;
