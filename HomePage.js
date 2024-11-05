import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get('https://HomePage.js-backend.cloud-stacks.com/api/diary');
        setDiaryEntries(response.data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };
    fetchDiaryEntries();
  }, []);

  const handleSearch = () => {
    const results = diaryEntries.filter(entry =>
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleCreateEntry = async (title, content) => {
    try {
      const response = await axios.post('https://HomePage.js-backend.cloud-stacks.com/api/diary', {
        title,
        content
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setDiaryEntries([...diaryEntries, response.data]);
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };

  const handleUpdateEntry = async (id, title, content) => {
    try {
      const response = await axios.put(`https://HomePage.js-backend.cloud-stacks.com/api/diary/${id}`, {
        title,
        content
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setDiaryEntries(diaryEntries.map(entry => (entry.id === id ? response.data : entry)));
    } catch (error) {
      console.error('Error updating diary entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`https://HomePage.js-backend.cloud-stacks.com/api/diary/${id}`);
      setDiaryEntries(diaryEntries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting diary entry:', error);
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">DiaryApp</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Diaries</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search diary entries..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {searchResults.map(entry => (
            <div key={entry.id} className="entry">
              {entry.content}
              <button onClick={() => handleUpdateEntry(entry.id, 'Updated Title', 'Updated Content')}>Update</button>
              <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div>© 2023 DiaryApp</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
