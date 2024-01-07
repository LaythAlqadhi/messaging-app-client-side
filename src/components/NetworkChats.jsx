import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import TopBarAlert from './TopBarAlert';
import NetworkChatItem from './NetworkChatItem';

const API_URL = 'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/chats';

const NetworkChats = ({ setChatId, onNetworkPage, setOnNetworkPage }) => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  

  useEffect(() => {
    const handleChats = () => {
      setLoading(true);

      const options = {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }

      fetch(API_URL, options)
        .then(response => response.json())
        .then(result => {
          if (result.status >= 400) {
            throw new Error('Server error');
          } else if (result.errors) {
            throw new Error(result.errors[0].msg);
          } else {
            setData(result);
          }
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }

    handleChats();
  }, []);

  return (
    loading ? <Loading /> :
    <>
      {error && <TopBarAlert className="fixed mt-0" message={error} />}
      <div className="h-full overflow-y-auto">
          {data && data.map(chat => (
          <NetworkChatItem
            key={chat['_id']}
            username={chat.users[1].profile.fullName}
            content={chat.messages[0].content}
            date={chat.messages[0].createdAt}
            onClick={() => {
              setChatId(chat['_id'])
              setOnNetworkPage(!onNetworkPage)
            }}
          />
        ))}
      </div>
    </>
  );
}

export default NetworkChats;
