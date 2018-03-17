import React from 'react';
import LetterList from './LetterList';

const LetterListWrapper = (props) => {

  const { year, month, day, history, match } = props;
  let url = 'http://andersen.sdu.dk/service/letters/';

  const person = match.params.person;

  if (person) {
    // If a person is selected
    url += `person/${person}`;
  }
  else {
    // If a year and a month are selected. Year only returns (too) many letters
    if ((year && year.value) && (month && month.value)) {
      url += `date/${('0000'+year.value).slice(-4)}-${('00'+month.value).slice(-2)}`;

      if (day && day.value) {
        // If there is also provided a day
        url += `-${('00'+day.value).slice(-2)}`;
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