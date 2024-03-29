import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatErrorMessage from '../utils/formatErrorMessage';
import Header from './Header';
import Footer from './Footer';

const API_URL = 'https://messaging.adaptable.app/v1/user/signup';

function SignUp({ setLoading, setError }) {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch(API_URL, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.status >= 400) {
          throw new Error('Server error');
        } else if (result.errors) {
          setError(result.errors[0].msg);
        } else {
          navigate('/');
        }
      })
      .catch((err) => setError(formatErrorMessage(err.message)))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header content="Sign Up to get started." />
      <main className="flex w-full flex-col items-center gap-4">
        <form className="form">
          <div className="flex w-full gap-4">
            <label className="sr-only" htmlFor="firstName">
              First Name
            </label>
            <input
              className="input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={body.firstName}
              onChange={(e) => setBody({ ...body, firstName: e.target.value })}
              minLength="1"
              maxLength="25"
              required
            />
            <label className="sr-only" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={body.lastName}
              onChange={(e) => setBody({ ...body, lastName: e.target.value })}
              minLength="1"
              maxLength="25"
              required
            />
          </div>
          <label className="sr-only" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={body.username}
            onChange={(e) => setBody({ ...body, username: e.target.value })}
            minLength="1"
            maxLength="25"
            required
          />
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={body.email}
            onChange={(e) => setBody({ ...body, email: e.target.value })}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
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
            placeholder="Password"
            value={body.password}
            onChange={(e) => setBody({ ...body, password: e.target.value })}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required
          />
          <label className="sr-only" htmlFor="passwordConfirmation">
            Password confirmation
          </label>
          <input
            className="input"
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Password confirmation"
            value={body.passwordConfirmation}
            onChange={(e) =>
              setBody({ ...body, passwordConfirmation: e.target.value })
            }
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required
          />
          <button
            className="button button-primary !w-full"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
        <Link className="link" to="/auth/signin">
          Already have an account?
        </Link>
      </main>
      <Footer />
    </>
  );
}

SignUp.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default SignUp;
