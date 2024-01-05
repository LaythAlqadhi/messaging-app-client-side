import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../assets/icon.png';

const Header = ({ content }) => (
    <header className="m-4 mb-auto flex flex-col items-center gap-1">
      <Link to="/">
        <img className="mb-2 w-20" src={icon} alt="Messaging App Icon" />
      </Link>
      <h1 className="text-primary text-center">Welcome to Messaging App</h1>
      <p className="text-secondary text-center">{content}</p>
    </header>
)

Header.defaultProps = {
  content: '',
};

Header.propTypes = {
  content: PropTypes.string,
};

export default Header;
