import React from 'react';

class IDInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
    this.handlekeyboardEvent = this.handlekeyboardEvent.bind(this);
  }

  handleLetterIDChange(e) {
    this.props.onLetterIDChange(e.target.value);
  }

  handlekeyboardEvent(e) {
    this.props.onKeyboardEvent(e.key);
  }

  render() {
    return (
      <div className="id-input label-input">
        <label htmlFor="id-input">Letter ID</label>
        {" "}
        <input
          type="number"
          id="id-input"
          placeholder={"ID"}
          min="1"
          max="99999"
          maxLength="5"
          onChange={this.handleLetterIDChange}
          onKeyDown={this.handlekeyboardEvent}
        />
      </div>
    );
  }
}

export default IDInput;