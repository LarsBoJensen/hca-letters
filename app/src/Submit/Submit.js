import React from 'react';

const Submit = ({ isActive, letter, history }) => {

  return (
    <button
      type="button"
      onClick={() => history.push(`/letter/${letter}`)}
      disabled={isActive ? '' : 'disabled'}
    >Show me</button>
  );
};

export default Submit;