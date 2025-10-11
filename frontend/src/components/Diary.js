import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const Diary = () => {
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/notes`, { headers: { Authorization: `Bearer ${token}` } });
      setNotes(res.data);
    } catch (err) {
      if (err.response && err.response.data) alert(err.response.data.message);
      else alert('Cannot connect to backend.');
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/notes`, { title, content }, { headers: { Authorization: `Bearer ${token}` } });
      setTitle(''); setContent('');
      fetchNotes();
    } catch (err) {
      if (err.response && err.response.data) alert(err.response.data.message);
      else alert('Cannot connect to backend.');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchNotes();
    } catch (err) {
      if (err.response && err.response.data) alert(err.response.data.message);
      else alert('Cannot connect to backend.');
    }
  };

  const logout = () => { localStorage.removeItem('token'); window.location.href = '/'; }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ color: '#2E8B57' }}>My Diary</h2>
        <button style={styles.logout} onClick={logout}>Logout</button>
      </div>
      <div style={styles.form}>
        <input style={styles.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea style={styles.textarea} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button style={styles.button} onClick={addNote}>Add Note</button>
      </div>
      <div style={styles.notes}>
        {notes.map(n => (
          <div key={n._id} style={styles.note}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <button style={styles.delete} onClick={() => deleteNote(n._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', padding: '20px', backgroundColor: '#f0fff0', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logout: { backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' },
  form: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  textarea: { width: '100%', padding: '10px', height: '80px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px 20px', backgroundColor: '#2E8B57', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  notes: {},
  note: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  delete: { backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }
};

export default Diary;
