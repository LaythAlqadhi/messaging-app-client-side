import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
import defaultPFP from '../assets/defaultPFP.png';

function Message({ isSender, pfp, username, content, date }) {
  return isSender ? (
    <div className="relative ml-auto flex w-fit items-end">
      <span className="ml-2 max-w-xs rounded-2xl bg-blue-500 p-3 text-white sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        {content}
      </span>
      <span className="text-secondary absolute -top-5 right-3 w-fit !text-sm">
        Me
      </span>
      <span className={`text-secondary absolute top-1/2 -left-2 -translate-x-1/2 -translate-y-1/2 w-fit !text-sm`}>
        {formatDate(date)}
      </span>
    </div>
  ) : (
    <div className="relative flex w-fit items-end">
      <img
        className="pointer-events-none h-12 w-12 rounded-full object-cover"
        src={pfp}
        alt=""
      />
      <span className="ml-2 max-w-xs rounded-2xl bg-gray-100 p-3 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        {content}
      </span>
      <span className="text-secondary absolute -top-5 left-[4.25rem] w-fit !text-sm">
        {username}
      </span>
    </div>
  );
}

Message.defaultProps = {
  pfp: defaultPFP,
};

Message.propTypes = {
  pfp: PropTypes.string,
  isSender: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
