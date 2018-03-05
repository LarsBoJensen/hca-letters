import React from 'react';

class IDInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handleLetterIDChange(e) {
    if (!(e.target.value)) {
      alert('ja');
      this.props.onLetterIDChange('-');
    }
    else {
      this.props.onLetterIDChange(e.target.value);
    }
  }

  render() {
    return (
      <div className="id-input label-input">
        <label htmlFor="id-input">Letter ID</label>
        {" "}
        <input type="number" id="id-input" placeholder={"ID"} min={1} max={99999} maxLength={5} value={this.props.letterID} onChange={this.handleLetterIDChange} />
      </div>
    );
  }
}

export default IDInput;