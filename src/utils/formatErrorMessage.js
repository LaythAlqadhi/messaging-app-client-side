const formatErrorMessage = (errorMsg) => {
  let friendlyMessage = 'An error occurred. Please try again later.';

  if (errorMsg.includes('timeout')) {
    friendlyMessage = 'Request timed out. Please check your internet connection.';
  } else if (errorMsg.includes('Server error')) {
    friendlyMessage = 'Oops! Something went wrong on our end. Please try again later.';
  } else if (errorMsg.includes('NetworkError when attempting to fetch')) {
    friendlyMessage = 'There seems to be a network issue. Please verify your internet connection.';
  } else if (errorMsg.includes('Failed to fetch')) {
    friendlyMessage = 'Failed to connect to the server. Please try again later.';
  } else if (errorMsg.includes('JSON Parse error')) {
    friendlyMessage = 'Failed to parse server response. Please contact support.';
  } else if (errorMsg.includes('AbortError')) {
    friendlyMessage = 'The request was aborted. Please try again.';
  } else if (errorMsg.includes('Invalid URL')) {
    friendlyMessage = 'Invalid URL. Please check the request configuration.';
  }
  return friendlyMessage;
}

export default formatErrorMessage;
