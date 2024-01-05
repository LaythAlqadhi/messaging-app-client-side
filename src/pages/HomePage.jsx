import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/user/login';
const options = {
  mode: 'cors',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'JohnDoe',
    password: 'SecurePass123!',
  }),
}

const HomePage = () => {
  const { token, signIn } = useAuth();

  const handleDemoAccount = () => {
    //fetch
  }
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between py-4">
      <Header content="The simple way to text right from your browser." />
      <main className="flex w-full flex-col items-center gap-5">
        <Link className="button button-primary w-3/4 max-w-lg" to="/signin">
          Sign In
        </Link>
        <Link className="button button-secondary w-3/4 max-w-lg" to="/signup">
          Sign Up
        </Link>
        <button className="link" type="button" onClick={handleDemoAccount}>
          Continue with a demo account
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
