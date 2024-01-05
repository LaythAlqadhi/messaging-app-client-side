import React from 'react';
import PropTypes from 'prop-types';

const TopBarAlert = ({ message }) => (
  <span className="-mt-4 w-full bg-red-500 p-2 text-white" role="alert" aria-live="assertive">
    {message}
  </span>
)

TopBarAlert.defaultProps = {
  message: 'Something went wrong.',
}

TopBarAlert.propTypes = {
  message: PropTypes.string,
}

export default TopBarAlert;
