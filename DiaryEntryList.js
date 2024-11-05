import React, { useState, useEffect } from 'react';
import './DiaryEntryList.css';
import axios from 'axios';

function DiaryEntryList() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('https://DiaryEntryList.js-backend.cloud-stacks.com/api/diary');
        setEntries(response.data);
        setFilteredEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleSearch = () => {
    const results = entries.filter(entry => 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(results);
  };

  const createEntry = async (title, content) => {
    try {
      const response = await axios.post('https://DiaryEntryList.js-backend.cloud-stacks.com/api/diary', { title, content }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setEntries([...entries, response.data]);
      setFilteredEntries([...entries, response.data]);
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const updateEntry = async (id, title, content) => {
    try {
      const response = await axios.put(`https://DiaryEntryList.js-backend.cloud-stacks.com/api/diary/${id}`, { title, content }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const updatedEntries = entries.map(entry => entry.id === id ? response.data : entry);
      setEntries(updatedEntries);
      setFilteredEntries(updatedEntries);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`https://DiaryEntryList.js-backend.cloud-stacks.com/api/diary/${id}`);
      const remainingEntries = entries.filter(entry => entry.id !== id);
      setEntries(remainingEntries);
      setFilteredEntries(remainingEntries);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="diary-entry-list">
      <header>
        <div className="navigation-tabs">
          <span>Home</span>
          <span>Diaries</span>
          <span>Profile</span>
          <span>Settings</span>
        </div>
        <div className="branding">
          <h1>Product Logo</h1>
        </div>
      </header>
      
      <main>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search diary entries..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="diary-entry">
              <h2>{entry.title}</h2>
              <p>{entry.content}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
        <div className="social-media">
          <span>Social Media Links</span>
        </div>
        <div className="copyright">
          <span>© 2023 Product Name</span>
        </div>
      </footer>
    </div>
  );
}

export default DiaryEntryList;
