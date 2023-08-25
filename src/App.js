import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import EditNote from './pages/EditNote';
import CreateNote from './pages/CreateNote';

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || []
  );
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CreateNote addNotes={setNotes} />}
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} updateNote={setNotes} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
