import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useCreateDate from '../hooks/useCreateDate';

const EditNote = ({ notes, updateNote }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);

  const navigate = useNavigate();
  const date = useCreateDate();

  const saveHandler = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => {
        if (item.id === id) {
          item = newNote;
        }
        return item;
      });

      updateNote(newNotes);
    }

    navigate('/');
  };

  const deleteHandler = () => {
    if (window.confirm('Are you want to delete this note?')) {
      const newNotes = notes.filter((item) => item.id !== id);

      updateNote(newNotes);
      navigate('/');
    }
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={saveHandler}>
          Save
        </button>
        <button className="btn danger" onClick={deleteHandler}>
          <RiDeleteBin6Line />
        </button>
      </header>

      <form className="create-note__form" onSubmit={saveHandler}>
        <input
          type="text"
          autoFocus
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Note Details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
