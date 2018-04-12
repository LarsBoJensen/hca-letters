import React, { Component } from 'react';
import { connect } from 'react-refetch';
// import Error from '../Error/Error';
import { Route } from 'react-router-dom';
import Group from '../People/Group/Group';
import NiceDate from '../NiceDate/NiceDate';
import LetterVersion from '../Letter/LetterVersion/LetterVersion';
import References from '../Letter/References/References';

/**
 * It is possible to hook into the defaults of connect and then wrap
 * the component in question with `refetch` instead of `connect` in order to
 * set the request.mode to no-cors. Like this:
 *
 * const refetch = connect.defaults({ mode: 'no-cors' });
 *
 * It does not matter much, though. It is only necessary on URL's that do not
 * return a letter anyway, but a 204 No Content.
 */


class DisplayLetter extends Component {

  constructor(props) {
    super(props);
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handleLetterIDChange(letterID, letterDrawerIsOpen) {
    // console.log(typeof this.props.onLetterIDChange);
    this.props.onLetterIDChange(letterID, letterDrawerIsOpen);
  }

  render () {
    const  { letter, open } = this.props;
    const letterID = letter['Letter ID'];
    const senders = letter.Senders;
    const receivers = letter.Receivers;
    const letterDate = letter['Letter date'];
    const versions = letter.Versions;
    const numberOfVersions = versions.length;
    const references = letter['Bibliography references'];
    const letterHeader = [];
    const letterContent = [];
    /**
     * Create an object to hold the versions. The object is used as a kind of
     * associative array. The key order maps to the the rendering order
     * of version types; first text versions, then originals, and so on.
     *
     * @type {{text: Array, original: Array, image: Array, other: Array}}
     */
    const content = {
      text: [],
      original: [],
      image: [],
      other: []
    };

    /**
     * Create letter header displaying sender(s), receiver(s) and the date
     */

    if (senders.length > 0) {
      letterHeader.push(
        <Group key="group1" correspondent="sender" people={senders}/>
      );
    }

    if (receivers.length > 0) {
      letterHeader.push(
        <Group key="group2" correspondent="receiver" people={receivers}/>
      );
    }

    if (letterDate) {
      letterHeader.push(
        <NiceDate key="3" date={letterDate}/>
      );
    }

    /**
     * Iterate through versions object values
     */
    for (let version of versions) {

      // Adds versions to their respective type's arrays in the versions object
      switch (version.Type) {
        case 'tekst':
          content.text.push(version);
          break;
        case 'original':
          content.original.push(version);
          break;
        case 'grafisk':
          content.image.push(version);
          break;
        default:
          content.other.push(version);
      }
    }

    for (let [type, versions] of Object.entries(content)) {
      if (versions.length > 0) {
        let x = 1;
        versions.forEach((letter) => {
          letterContent.push(
            <LetterVersion
              type={type}
              version={letter}
              numberofversions={numberOfVersions}
              number={x}
              key={type + x}
            />
          );
          x++;
        });
      }
    }

    return (
      <section className={`letter drawer ${open}`}>
        <div className="drawer-inner">
          <h2 className="letter-header">
            <i className="icon close-left" onClickCapture={() => { this.handleLetterIDChange(letterID, false) }}>⇦</i>
            <span>Letter</span>
            {' '}
            {letterHeader}
          </h2>
          {letterContent}
          <h3 className="letter-id">Letter ID for reference: {letterID}</h3>
          { references.length > 0 &&
          <References references={references}/>
          }
        </div>
      </section>
    );
  }
}


class Letter extends Component {

  render() {
  const { fetch, open, onLetterIDChange } = this.props;

    if (fetch.pending) {
      return <p className="fetch-message">Fetching a letter with the selected ID. Please wait...</p>
    } else if (fetch.rejected || (fetch.fulfilled && fetch.value === null)) {
      // return <Error error={fetch.reason}/>
      return <p className="fetch-message">An error occurred. Or, more likely, there is no letter with the ID {this.props.url.match.params.letterID}.</p>
    } else if (fetch.fulfilled && fetch.value !== null) {
      return <Route render={(props) => <DisplayLetter history={props.history} letter={fetch.value} open={open} onLetterIDChange={onLetterIDChange} />} />
    }
  }
}

/**
 * The web service delivering data for this app cannot be accessed via HTTPS.
 * Prepending the API with a proxy URL (where the node.js proxy CORS-anywhere,
 * please see https://github.com/Rob--W/cors-anywhere, is running):
 * https://nameless-tor-69195.herokuapp.com
 */
const API = 'https://nameless-tor-69195.herokuapp.com/http://andersen.sdu.dk/service/letters/';

export default connect(props => ({
  onLetterIDChange: props.onLetterIDChange,
  open: props.open,
  fetch: {
    url: `${API}${props.url.match.params.letterID}?htmlencode=false`,
    headers: {
      'Content-Type': ''
    }
  }
}))(Letter)
