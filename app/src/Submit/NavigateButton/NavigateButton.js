import React from 'react';

const NavigateButton = ({ title, letter, year, month, day, history }) => (
  <button
    type="button"
    onClick={() => history.push(`/letter/${letter}/year/${year}/month/${month}/day/${day}`)}
  >
    {title}
  </button>
);

export default NavigateButton;