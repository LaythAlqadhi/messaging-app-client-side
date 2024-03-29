import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import Message from './Message';
import TopBarAlert from './TopBarAlert';
import formatErrorMessage from '../utils/formatErrorMessage';

const API_URL = 'https://messaging.adaptable.app/v1/chats';

function Chat({ onNetworkPage, setOnNetworkPage, chatId }) {
  const { token } = useAuth();
  const messagesContainerRef = useRef(null);
  const uploadImageRef = useRef(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (chatId) {
      fetch(`${API_URL}/${chatId}`, options)
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
        .catch((err) => setError(formatErrorMessage(err.message)));
    }
  }, [chatId, token]);

  const updateMessageStatus = (id, status) => {
    setData((prevData) => {
      const updatedMessages = prevData.messages.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            status,
          };
        }
        return msg;
      });

      return {
        ...prevData,
        messages: updatedMessages,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const messageId = uuidv4();

    setData({
      ...data,
      messages: [
        ...data.messages,
        {
          id: messageId,
          isSender: true,
          content: message,
          createdAt: Date.now(),
          status: 'Loading',
          user: {
            profile: {
              fullName: 'Me',
            },
          },
        },
      ],
    });

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId,
        content: message,
      }),
    };

    setMessage('');

    fetch(`${API_URL}/message`, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.status >= 400) {
          throw new Error('Server error');
        }
        updateMessageStatus(messageId, 'Success');
      })
      .catch(() => updateMessageStatus(messageId, 'Error'));
  };

  const handleUploadImageClick = () => {
    uploadImageRef.current.click();
  };

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <section
      className={`${
        onNetworkPage
          ? 'max-[767px]:-translate-x-1/2'
          : 'max-[767px]:translate-x-1/2'
      } h-dvh tansiton-transform border-1 flex flex-col justify-between border border-gray-200 duration-300 max-[767px]:w-screen`}
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
          arrow_back_ios
        </button>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Chat
        </span>
      </div>
      {error && <TopBarAlert className="mt-0" message={error} />}
      <div
        ref={messagesContainerRef}
        className="mb-aito flex  h-[calc(100%-6.5rem)] flex-col gap-8 overflow-y-auto p-4 pt-8"
      >
        {data &&
          data.messages.map((msg) => (
            <Message
              key={msg.id}
              isSender={msg.isSender}
              username={msg.user.profile.fullName}
              content={msg.content}
              date={msg.createdAt}
              status={msg.status}
            />
          ))}
      </div>
      <div className="flex w-full border-2 border-gray-200 bg-white">
        <form className="w-full" onSubmit={handleSendMessage}>
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <input
            className="w-full px-5 py-5 text-base placeholder-gray-400"
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            required
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

Chat.defaultProps = {
  chatId: null,
};

Chat.propTypes = {
  onNetworkPage: PropTypes.bool.isRequired,
  setOnNetworkPage: PropTypes.func.isRequired,
  chatId: PropTypes.string,
};

export default Chat;
