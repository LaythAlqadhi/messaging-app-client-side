import React from 'react';

function AddUser() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <h1 className="text-primary text-center !text-4xl">Add by Username</h1>
      <p className="text-secondary text-center mt-4">Who would you like to add to your network?</p>
      <form className="form">
        <label className="sr-only" htmlFor="username">Username</label>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          minLength="1"
          maxLength="25"
          placeholder="Enter a username"
        />
        <button className="button button-primary !w-full" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddUser;
