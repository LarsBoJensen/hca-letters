import React from 'react';

const DateValidator = (props) => {
  const { year, month, day } = props;

  if (((month && !year) || (year && !month)) || (day && (!year || !month))) {
    /**
     * If there is a selected a month, but no year or vice versa, or if there
     * is selected a day, but no month and/or no year
     */
    return (
      <p className="validation-instructions">Please select at least a month and a year.</p>
    );
  }
  else {
    return ('');
  }
};

export default DateValidator;