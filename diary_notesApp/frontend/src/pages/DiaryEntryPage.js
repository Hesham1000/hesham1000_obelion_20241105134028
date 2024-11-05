import React, { useState } from 'react';
import './DiaryEntryPage.css';
import axios from 'axios';

function DiaryEntryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

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
      if (response.status === 201) {
        setTitle('');
        setContent('');
        setError('');
        // Handle success action like redirecting or showing success message
      }
    } catch (err) {
      setError('An error occurred while creating the diary entry.');
    }
  };

  return (
    <div className="diary-entry-page">
      <header className="header">
        <div className="logo">DiaryNotesApp</div>
        <nav className="navigation">
          <ul>
            <li className="active">Create Diary Entry</li>
            <li>View Previous Entries</li>
            <li>Profile</li>
          </ul>
        </nav>
      </header>
      <main className="main-body">
        <form className="diary-form">
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
            ></textarea>
          </div>
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="additional-links">
          <a href="/view-previous-entries">View Previous Entries</a>
        </div>
      </main>
      <footer className="footer">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default DiaryEntryPage;
