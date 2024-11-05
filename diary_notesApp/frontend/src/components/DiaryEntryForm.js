import React, { useState } from 'react';
import './DiaryEntryForm.css';
import axios from 'axios';

function DiaryEntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.post('https://diary_notesApp-backend.cloud-stacks.com/api/diary', {
        title,
        content,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess('Diary Entry Saved Successfully');
    } catch (err) {
      setError('An error occurred while saving the diary entry.');
    }
  };

  return (
    <div className="diary-entry-form">
      <header>
        <div className="logo">Diary App</div>
        <nav>
          <ul>
            <li className="active">Create Diary Entry</li>
            <li>View Previous Entries</li>
          </ul>
        </nav>
      </header>
      <main>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleSave}>Save</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="additional-links">
          <a href="/view-previous-entries">View Previous Entries</a>
        </div>
      </main>
      <footer>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default DiaryEntryForm;
