import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

function Chat({ onNetworkPage, setOnNetworkPage }) {
  const messagesContainerRef = useRef(null);
  const uploadImageRef = useRef(null);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleUploadImageClick = () => {
    uploadImageRef.current.click();
  };

  return (
    <section
      className={`${
        onNetworkPage
          ? 'max-[767px]:-translate-x-1/2'
          : 'max-[767px]:translate-x-1/2'
      } tansiton-transform border-1 flex flex-col border border-gray-200 duration-300 max-[767px]:w-screen`}
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
          John Doe
        </span>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex h-[calc(100%-6.5rem)] flex-col gap-8 overflow-y-auto p-4 pt-8"
      >
        <Message isSender={false} username="John Doe" content="GUYS" />
        <Message isSender={false} username="John Doe" content="new year goal" />
        <Message
          isSender={false}
          username="John Doe"
          content="visit functional programming language"
        />
        <Message
          isSender={false}
          username="John Doe"
          content="i mean that i'll begin with elixir or haskell"
        />
        <Message
          isSender={false}
          username="John Doe"
          content="is more user friendly languages"
        />
        <Message
          isSender={false}
          username="Sarah Doe"
          content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        />
        <Message
          isSender={false}
          username="Sarah Doe"
          content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        />
        <Message
          isSender
          username="Dude"
          content="Hi, in order to start customizing your system you need to decide whether you prefer a desktop environment or a window manager. Usually the posts featured on unixporn utilize a window manager to achieve really nice rices. Since you are a beginner, one option is to start customizing a desktop environment such as GNOME with extensions. There are several videos on youtube you can search to learn how to do this. I can provide you with some links if you'd like. Also, all posts on unixporn feature dotfiles in the comments, which are configuration files hosted on a github or gitlab repository. You can check those out in order to understand the applications that are being used. Unixporn also features a somewhat limited wiki that can help you start ricing."
        />
      </div>
      <div className="flex w-full border-2 border-gray-200 bg-white">
        <label className="sr-only" htmlFor="message">Message</label>
        <input
          className="w-full px-5 py-5 text-base placeholder-gray-400"
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
        />
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
