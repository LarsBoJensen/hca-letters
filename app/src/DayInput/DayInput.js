import React from "react";
import { Route } from 'react-router-dom';

class DayInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(e) {
    this.props.onDayChange(e.target.value);
  }

  render() {
    return (
      <Route path="/letter/:letterID/year/:year/month/:month/day/:day" children={({match}) => (
        <div className="date-input label-input">
          <label htmlFor="day-input">Day</label>
          {" "}
          <input
            type="number"
            id="day-input"
            placeholder={match ? match.params.day : '00'}
            min={0}
            max={31}
            maxLength={2}
            onChange={this.handleDayChange}
          />
        </div>
      )} />

    );
  }
}

export default DayInput;