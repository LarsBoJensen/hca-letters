import React from "react";
import NiceDate from '../../NiceDate/NiceDate';

class LetterListRow extends React.Component {

  constructor(props) {
    super(props);
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handleLetterIDChange(letterID) {
    const { onLetterIDChange } = this.props;
    onLetterIDChange(letterID);
  }

  render() {
    const  { letterRow, selected } = this.props;
    return (
      <tr className={selected ? 'letterlist-row selected': 'letterlist-row'} onClick={() => { this.handleLetterIDChange(letterRow['ID']) }}>
        <td className="sender">{letterRow['Sender name']}</td>
        <td className="receiver">{letterRow['Receiver name']}</td>
        <td className="date"><NiceDate date={letterRow.Date} /></td>
      </tr>
    );
  }
}

export default LetterListRow;