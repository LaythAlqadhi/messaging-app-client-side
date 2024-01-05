import React, { useState } from 'react';
import Chat from '../components/Chat';
import Network from '../components/Network';

function ChatPage() {
  const [onNetworkPage, setOnNetworkPage] = useState(false);

  return (
    <div className="relative grid grid-cols-2 grid-rows-[100vh] overflow-hidden border border-2 border-gray-200 md:grid-cols-[35%,_65%] ">
      <Network
        onNetworkPage={onNetworkPage}
        setOnNetworkPage={setOnNetworkPage}
      />
      <Chat onNetworkPage={onNetworkPage} setOnNetworkPage={setOnNetworkPage} />
    </div>
  );
}

export default ChatPage;
