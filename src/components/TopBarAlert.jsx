import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TopBarAlert = ({ message, className }) => {
  const [trigger, setTrigger] = useState(true)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTrigger(false);
    }, 10000)
  }, [])
  
  return (
    trigger &&
    <span className={`${className} -mt-4 w-full bg-red-500 p-2 text-white`} role="alert" aria-live="assertive">
      {message}
    </span>
  );
}

TopBarAlert.defaultProps = {
  message: 'Something went wrong.',
}

TopBarAlert.propTypes = {
  message: PropTypes.string,
}

export default TopBarAlert;
