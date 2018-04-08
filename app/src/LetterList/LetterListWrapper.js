import React, {Component} from 'react';
import LetterList from './LetterList';

class LetterListWrapper extends Component {

  constructor(){
    super();

    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handleLetterIDChange(letterID) {
    this.props.onLetterIDChange(letterID);
  }

  render() {
    const { history, match } = this.props;
    const { person, year, month, day } = match.params;
    let url = 'https://cors-anywhere.herokuapp.com/http://andersen.sdu.dk/service/letters/';
    let instructions = 'Not enough parameters. Please select at least a year and a month.';

    if (person) {
      // If a person is selected
      if (person !== '1') {
        // and it is not Hans Christian Andersen (= loading almost all letters)
        url += `person/${person}`;
      }
      else {
        url = null;
        instructions = 'Loading all letters to and from Hans Christian Andersen would mean loading almost all letters in the database. It does not make sense, and it puts a large load on your device. So the app does not do that. Please select someone else.'
      }
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
        <LetterList url={url} history={history} onLetterIDChange={this.handleLetterIDChange} />
      );
    }
    else {
      // No web service URL
      return (
        <p className="fetch-message">{instructions}</p>
      );
    }
  }
}

export default LetterListWrapper;