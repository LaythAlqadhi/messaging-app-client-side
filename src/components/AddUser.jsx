import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import TopBarAlert from './TopBarAlert';
import formatErrorMessage from '../utils/formatErrorMessage';

const API_URL = 'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/chats';

const AddUser = ({ setOnAddPage, onAddPage }) => {
  const { token } = useAuth();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleAddUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ username: username }),
    }

    fetch(API_URL, options)
      .then(response => response.json())
      .then(result => {
        if (result.status >= 400) {
          throw new Error('Server error');
        } else if (result.errors) {
          setError(result.errors[0].msg);
        } else {
          setOnAddPage(!onAddPage);
        }
      })
      .catch(err => setError(formatErrorMessage(err.message)))
      .finally(() => {
        setLoading(false);
      });
  }
  
  return (
    loading ? <Loading /> :
    <>
      {error && <TopBarAlert className="fixed mt-0" message={error} />}
      <div className="flex h-full flex-col items-center justify-center p-4">
        <h1 className="text-primary text-center !text-4xl">Add by Username</h1>
        <p className="text-secondary text-center mt-4">Who would you like to add to your network?</p>
        <form className="form">
          <label className="sr-only" htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="1"
            maxLength="25"
            placeholder="Enter a username"
          />
          <button className="button button-primary !w-full" type="submit" onClick={handleAddUser}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUser;
