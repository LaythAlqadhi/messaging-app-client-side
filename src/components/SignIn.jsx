import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'https://5f7a2a25-c477-4bb6-a144-6648b07a57e7-00-ima9v6j5x5e.picard.replit.dev/v1/user/login';


const SignIn = ({ setLoading, setError }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [body, setBody] = useState({ username: '', password: '' });

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
          throw new Error(result.errors[0].msg);
        } else {
          signIn(result.token);
          navigate('/');
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }
  
  return (
    <main className="flex w-full flex-col items-center gap-4">
      <form className="form">
        <div className="flex justify-between" />
        <label className="sr-only" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          value={body.username}
          onChange={e => setBody({ ...body, username: e.target.value })}
          placeholder="Username"
          minLength="1"
          maxLength="25"
          required
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={body.password}
          onChange={e => setBody({ ...body, password: e.target.value })}
          placeholder="Password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          required
        />
        <button className="button button-primary !w-full" type="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      <Link className="link" to="/signup">
        Sign up for an account.
      </Link>
    </main>
  );
}

export default SignIn;
