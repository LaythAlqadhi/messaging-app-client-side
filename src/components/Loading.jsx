import React from 'react';

function Loading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-200 border-t-blue-500" />
    </div>
  );
}

export default Loading;
