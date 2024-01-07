import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import NetworkChats from './NetworkChats';
import AddUser from './AddUser';

const Network = ({ onNetworkPage, setOnNetworkPage, setChatId }) => {
  const [onAddPage, setOnAddPage] = useState(false);
  const { signOut } = useAuth();

  return (
    <section
      className={`${
        onNetworkPage
          ? 'max-[767px]:-translate-x-full'
          : 'max-[767px]:translate-x-0'
      } tansiton-transform h-full duration-300 max-[767px]:w-screen`}
      aria-hidden={onNetworkPage ? 'false' : 'true'}
      tabIndex={onNetworkPage ? '0' : '-1'}
    >
      <div className="relative flex h-14 w-full items-center justify-between border border-b-2 border-gray-200 bg-gray-100 px-4">
        <button
          className="material-symbols-outlined cursor-pointer active:scale-95"
          type="button"
          onClick={() => signOut()}
          aria-label="Sign out"
        >
          logout
        </button>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Network
        </span>
        <button
          className="material-symbols-outlined cursor-pointer active:scale-95 ml-auto mr-4"
           type="button"
          onClick={() => setOnAddPage(!onAddPage)}
          aria-label={onAddPage ? 'Cancel' : 'Add'}
        >
          {onAddPage ? 'cancel' : 'add_circle'}
        </button>
        <button
          className="material-symbols-outlined cursor-pointer active:scale-95 md:hidden"
          type="button"
          onClick={() => setOnNetworkPage(!onNetworkPage)}
          aria-label="Chat"
        >
          chat
        </button>
      </div>
      {onAddPage ? <AddUser setOnAddPage={setOnAddPage} onAddPage={onAddPage} /> : <NetworkChats setChatId={setChatId} onNetworkPage={onNetworkPage} setOnNetworkPage={setOnNetworkPage} />}
    </section>
  );
}

Network.propTypes = {
  onNetworkPage: PropTypes.bool.isRequired,
  setOnNetworkPage: PropTypes.func.isRequired,
};

export default Network;
