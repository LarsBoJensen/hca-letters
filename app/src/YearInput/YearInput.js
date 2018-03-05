import React from "react";
import { Route } from 'react-router-dom';

class YearInput extends React.Component {
  constructor (props) {
    super(props);

    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange(e) {
    this.props.onYearChange(e.target.value);
  }

  render() {
    return (
      <Route path="/letter/:letterID/year/:year" children={({ match }) => (
        <div className="date-input label-input">
          <label htmlFor="year-input">Year</label>
          {" "}
          <input
            type="number"
            id="year-input"
            placeholder={match ? match.params.year : '0000'}
            min={0}
            max={2100}
            maxLength={4}
            onChange={this.handleYearChange}
          />
        </div>
      )}/>
    );
  }
}

export default YearInput;