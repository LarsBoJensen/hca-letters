import React, {Component} from 'react';
import './Submit.css';

class Submit extends Component {

  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleClickSubmit(letterID, open) {
    this.props.history.push(`/letter/${letterID}`);
    this.props.onLetterIDChange(letterID, open);
  }

  render() {
    const { isActive, letter } = this.props;
    return (
      <button
        type="button"
        onClick={() => this.handleClickSubmit(letter, true)}
        disabled={isActive ? '' : 'disabled'}
      >Show me</button>
    );
  }
}

export default Submit;