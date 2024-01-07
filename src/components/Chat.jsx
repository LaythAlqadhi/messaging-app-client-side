import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import Message from './Message';

const API_URL = 'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/chats';

const Chat = ({ onNetworkPage, setOnNetworkPage, chatId }) => {
  const messagesContainerRef = useRef(null);
  const uploadImageRef = useRef(null);
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [trigger, setTrigger] = useState(false);
  
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

      fetch(`${API_URL}/${chatId}`, options)
        .then(response => response.json())
        .then(result => {
          if (result.status >= 400) {
            throw new Error('Server error');
          } else {
            setData(result);
          }
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }

    handleChats();
  }, [chatId, trigger]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessage('')
    setLoading(true);

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId: chatId,
        content: message,
      })
    }

    fetch(`${API_URL}/message`, options)
      .then(response => response.json())
      .then(result => {
        if (result.status >= 400) {
          throw new Error('Server error');
        }
      })
      .catch(err => setError(err))
      .finally(() => {
        setTrigger(!trigger);
        setLoading(false)
      });
  }

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const handleUploadImageClick = () => {
    uploadImageRef.current.click();
  };

  return (
    <section
      className={`${
        onNetworkPage
          ? 'max-[767px]:-translate-x-1/2'
          : 'max-[767px]:translate-x-1/2'
      } tansiton-transform border-1 flex flex-col justify-between border border-gray-200 duration-300 max-[767px]:w-screen`}
      aria-hidden={onNetworkPage ? 'true' : 'false'}
      tabIndex={onNetworkPage ? '-1' : '0'}
    >
      <div className="relative flex h-14 items-center border border-b-2 border-gray-200 bg-gray-100 px-4">
        <button
          className="material-symbols-outlined cursor-pointer active:scale-95 md:hidden"
          type="button"
          onClick={() => setOnNetworkPage(!onNetworkPage)}
          aria-label="Network"
        >
          group
        </button>

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Chat
        </span>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex h-[calc(100%-6.5rem)]  mb-aito flex-col gap-8 overflow-y-auto p-4 pt-8"
      >

        {data && data.messages.map(msg => (
          <Message key={msg.id} isSender={msg.isSender} username={msg.user.fullName} content={msg.content} date={msg.createdAt} />
        ))}
        
      </div>
      <div className="flex w-full border-2 border-gray-200 bg-white">
        <form className="w-full" onSubmit={handleSendMessage}>
          <label className="sr-only" htmlFor="message">Message</label>
          <input
            className="w-full px-5 py-5 text-base placeholder-gray-400"
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
        </form>
        <div className="m-5 flex items-center gap-2 text-2xl">
          <button
            className="material-symbols-outlined cursor-pointer active:scale-95"
            type="button"
            aria-label="Upload image"
            onClick={handleUploadImageClick}
          >
            Image
            <input
              className="hidden"
              type="file"
              name="image"
              accept="image/*"
              ref={uploadImageRef}
            />
          </button>
          <button
            className="material-symbols-outlined cursor-pointer active:scale-95"
            type="button"
            aria-label="Like"
            onMouseDown={() => setMessage('\u{1F44D}')}
            onMouseUp={handleSendMessage}
          >
            thumb_up
          </button>
        </div>
      </div>
    </section>
  );
}

Chat.propTypes = {
  onNetworkPage: PropTypes.bool.isRequired,
  setOnNetworkPage: PropTypes.func.isRequired,
};

export default Chat;