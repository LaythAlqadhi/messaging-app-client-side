import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopBarAlert from '../components/TopBarAlert';
import formatErrorMessage from '../utils/formatErrorMessage';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL =
  'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/user/signin';

function InitialPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDemoAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'DemoAccount',
        password: 'SecurePass123!',
      }),
    };

    fetch(API_URL, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.status >= 400) {
          throw new Error('Server error');
        } else if (result.errors) {
          setError(result.errors[0].msg);
        } else {
          signIn(result.token);
          navigate('/');
        }
      })
      .catch((err) => setError(formatErrorMessage(err.message)))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex h-screen w-full flex-col items-center justify-between py-4">
      {error && <TopBarAlert message={error} />}
      <Header content="The simple way to text right from your browser." />
      <main className="flex w-full flex-col items-center gap-5">
        <Link
          className="button button-primary w-3/4 max-w-lg"
          to="/auth/signin"
        >
          Sign In
        </Link>
        <Link
          className="button button-secondary w-3/4 max-w-lg"
          to="/auth:signup"
        >
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

export default InitialPage;
