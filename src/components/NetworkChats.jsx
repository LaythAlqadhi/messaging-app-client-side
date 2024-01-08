import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import TopBarAlert from './TopBarAlert';
import NetworkChatItem from './NetworkChatItem';
import formatErrorMessage from '../utils/formatErrorMessage';

const API_URL =
  'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/chats';

function NetworkChats({ setChatId, onNetworkPage, setOnNetworkPage }) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleChats = () => {
      setLoading(true);

      const options = {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(API_URL, options)
        .then((response) => response.json())
        .then((result) => {
          if (result.status >= 400) {
            throw new Error('Server error');
          } else if (result.errors) {
            setError(result.errors[0].msg);
          } else {
            setData(result);
          }
        })
        .catch((err) => setError(formatErrorMessage(err.message)))
        .finally(() => setLoading(false));
    };

    handleChats();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) setChatId(data[0].id);
  }, [data]);

  if (loading) return <Loading />;
  if (data && data.length === 0) {
    return (
      <div className="text-primary flex h-full items-center justify-center">
        Looks like your inbox is empty!
      </div>
    );
  }

  return (
    <>
      {error && <TopBarAlert className="fixed mt-0" message={error} />}
      <div className="h-full overflow-y-auto">
        {data &&
          data.map((chat) => (
            <NetworkChatItem
              key={chat.id}
              username={chat.users[1].profile.fullName}
              content={chat.messages[0].content}
              date={chat.messages[0].createdAt}
              onClick={() => {
                setChatId(chat.id);
                setOnNetworkPage(!onNetworkPage);
              }}
            />
          ))}
      </div>
    </>
  );
}

NetworkChats.propTypes = {
  setChatId: PropTypes.func.isRequired,
  onNetworkPage: PropTypes.bool.isRequired,
  setOnNetworkPage: PropTypes.func.isRequired,
};

export default NetworkChats;
