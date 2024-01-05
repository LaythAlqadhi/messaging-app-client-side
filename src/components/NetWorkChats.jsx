import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import NetworkChatItem from './NetworkChatItem';

const NetWorkChats = () => {
  const { token } = useAuth();
  const [body, setBody] = useState();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    fetch(API_URL, options)
      .then(response => response.json())
      .then(result => {
        if (result.status >= 400) {
          throw new Error('Server error');
        } else if (result.errors) {
          setMessage(result.errors[0].msg);
        } else {
          signIn(result.token);
          navigate('/');
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }
  
  return (
    <div className="h-full overflow-y-auto">
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
      <NetworkChatItem
        username="John Doe"
        content="Any one tell how they install such beautiful theme on Linux. I saw some on unixporn on Reddit. I use Debian with genome, im new to linux"
        date={Date.now()}
      />
    </div>
  );
}

export default NetWorkChats;
