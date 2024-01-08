import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TopBarAlert({ message, className }) {
  const [trigger, setTrigger] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTrigger(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    trigger && (
      <span
        className={`${className} z-50 -mt-4 w-full bg-red-500 p-2 text-white`}
        role="alert"
        aria-live="assertive"
      >
        {message}
      </span>
    )
  );
}

TopBarAlert.defaultProps = {
  message: 'Something went wrong.',
  className: '',
};

TopBarAlert.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default TopBarAlert;
