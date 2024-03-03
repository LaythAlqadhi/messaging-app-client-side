import React from 'react';

function NotFoundPage() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center">
      <h1 className="text-primary text-center !text-4xl">404 - Not Found</h1>
      <p className="text-secondary mt-5 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}

export default NotFoundPage;
