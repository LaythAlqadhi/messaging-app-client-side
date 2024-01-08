import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
import defaultPFP from '../assets/defaultPFP.png';

function NetworkChatItem({ pfp, username, content, date, onClick }) {
  return (
    <button
      className="flex w-full cursor-pointer items-center gap-4 border border-b-2 border-gray-200 p-4 text-left"
      type="button"
      onClick={onClick}
    >
      <img
        className="pointer-events-none h-20 w-20 rounded-full object-cover"
        src={pfp}
        alt=""
      />
      <div className="flex flex-col overflow-hidden">
        <span className="text-primary">{username}</span>
        <span className="text-secondary truncate">{content}</span>
      </div>
      <span className="text-secondary ml-auto min-w-fit">
        {formatDate(date)}
      </span>
    </button>
  );
}

NetworkChatItem.defaultProps = {
  pfp: defaultPFP,
};

NetworkChatItem.propTypes = {
  pfp: PropTypes.string,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NetworkChatItem;
