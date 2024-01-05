const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const minuteInMillis = 60 * 1000;
  const hourInMillis = 60 * minuteInMillis;
  const dayInMillis = 24 * hourInMillis;
  const weekInMillis = 7 * dayInMillis;
  const yearInMillis = 365 * dayInMillis;

  const timeDifference = now - date;

  if (timeDifference < minuteInMillis) {
    return 'Now';
  }
  if (timeDifference < hourInMillis) {
    const minutesAgo = Math.floor(timeDifference / minuteInMillis);

    return `${minutesAgo}m`;
  }
  if (timeDifference < dayInMillis) {
    const hoursAgo = Math.floor(timeDifference / hourInMillis);

    return `${hoursAgo}h`;
  }
  if (timeDifference < weekInMillis) {
    const daysAgo = Math.floor(timeDifference / dayInMillis);

    return `${daysAgo}d`;
  }
  if (timeDifference < yearInMillis) {
    const weeksAgo = Math.floor(timeDifference / weekInMillis);

    return `${weeksAgo}w`;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}.${month}.${year}`;
};

export default formatDate;
