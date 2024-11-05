import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const fetchDiaryEntries = async () => {
    try {
      const response = await axios.get('https://SearchBar.js-backend.cloud-stacks.com/api/diary');
      setDiaryEntries(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = diaryEntries.filter(entry =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="search-bar-container">
      <header className="header">
        <div className="branding">
          <h1>Diary App</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li>Home</li>
            <li>Diaries</li>
            <li>Profile</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search diary entries..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="result-item">
              <h2>{result.title}</h2>
              <p>{result.content}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default SearchBar;
