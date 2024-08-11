import { useEffect, useRef, useState } from 'react';
import NoteList from '../NoteList/NoteList.jsx';
import styles from './App.module.css';
import NoteItem from '../NoteItem/NodeItem.jsx';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const noteInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setInfo(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const addNotes = (element) => {
    element.preventDefault();
    let newNote = noteInputRef.current.value;
    if (newNote.trim()) {
      setNotes((prevNotes) => [...prevNotes, newNote]);
      noteInputRef.current.value = '';
    }
  };

  const deleteNote = (index) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes.splice(index, 1);
      return newNotes;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.information}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>Name: <span className={styles.name}>{info.name}</span></div>
        )}
      </div>
      <form onSubmit={addNotes}>
        <input type="text" name="noteInput" ref={noteInputRef} className={styles.input} />
        <button type="submit" className={styles.button}>Add notes</button>
      </form>
      <div>
        {notes.length === 0 ? (
          <p className={styles.no_notes}>No notes</p>
        ) : (
          <NoteList title='Notes'>
            {notes.map((note, index) => (
              <NoteItem key={index} note={note} index={index} getDelete={() => deleteNote(index)} />
            ))}
          </NoteList>
        )}
      </div>
    </div>
  );
};

export default App;
