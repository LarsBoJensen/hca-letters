import React from 'react';
import LetterListRow from '../LetterList/LetterListRow/LetterListRow';
import { connect } from 'react-refetch';
// import Error from '../Error/Error';

class GetLetterList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      letterID: ''
    };

    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handleLetterIDChange(letterID) {
    this.setState({
      letterID: letterID
    });

    /**
     * Add or replace the letterID in the path
     */
    // If there is already a letter in the path
    if (/\/letter\/([0-9]+)$/.test(this.props.history.location.pathname)) {
      // Replace the letter/ID
      this.props.history.push(this.props.history.location.pathname.replace(/\/letter\/[0-9]+/, `/letter/${letterID}`));
    }
    else {
      // Append letter/ID to the path
      this.props.history.push(`${this.props.history.location.pathname}/letter/${letterID}`);
    }
  }

  render() {

    const rows = [];

    for (let [key, letterHeader] of Object.entries(this.props.list)){
      // Filter out web service metadata entries
      if(Number.isInteger(parseInt(key, 10))) {
        // Add letters to the list
        rows.push(
          <LetterListRow
            key={letterHeader.ID}
            letterRow={letterHeader}
            onLetterIDChange={this.handleLetterIDChange}
            selected={ letterHeader.ID === this.state.letterID }
          />
        );
      }
    }

    const letterAmount = rows.length;

    return (
      <table className="letterlist">
        <caption id="letterlist">{letterAmount} {letterAmount > 1 ? 'letters' : 'letter' } found:</caption>
        <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>On</th>
        </tr>
        </thead>
        <tbody tabIndex="0" role="list" aria-labelledby="letterlist">
        {rows}
        </tbody>
      </table>
    );
  }
}

const LetterList = (props) => {
  const { letterListFetch } = props;

  if (letterListFetch.pending) {
    return <p className="fetch-message">Fetching a list of letters. Please wait...</p>
  } else if (letterListFetch.rejected) {
    // return <Error error={letterListFetch.reason} />
    return <p className="fetch-message">No letters found with the given parameters.</p>
  } else if (letterListFetch.fulfilled) {
    return <GetLetterList list={letterListFetch.value} history={props.history} letterID={props.letterID} />
  }
};

export default connect(props => ({
  letterListFetch: {
    url: `${props.url}`,
    headers: {
      'Content-Type': ''
    }
  }
}))(LetterList)
