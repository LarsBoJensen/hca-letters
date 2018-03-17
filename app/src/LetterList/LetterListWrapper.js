import React from 'react';
import LetterList from './LetterList';

const LetterListWrapper = (props) => {

  const { history, match } = props;
  const { person, year, month, day } = match.params;
  let url = 'http://andersen.sdu.dk/service/letters/';

  if (person) {
    // If a person is selected
    url += `person/${person}`;
  }
  else {
    // If a year and a month are selected. Year only returns (too) many letters
    if ((year) && (month)) {
      url += `date/${('0000'+year).slice(-4)}-${('00'+month).slice(-2)}`;

      if (day) {
        // If there is also provided a day
        url += `-${('00'+day).slice(-2)}`;
      }
    }
    else {
      // No year and month.
      url = null;
    }
  }

  if (url !== null) {
    // If there is a web service URL to be fetched
    return (
      <LetterList url={url} history={history} />
    );
  }
  else {
    // No web service URL
    return (
      <p className="fetch-message">Not enough parameters. Please select at least a year and a month.</p>
    );
  }
};

export default LetterListWrapper;