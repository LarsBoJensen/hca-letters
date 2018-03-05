import React from 'react';

const Error = ({error}) => {

  return (
    <div className="error">
      <p>Something went wrong.</p>
      <p>
        {'Message: '}
        <code>{error.message}</code>
      </p>
      <p>
        {'Stack: '}
        <code>{error.stack}</code>
      </p>
    </div>
  );
};

export default Error;