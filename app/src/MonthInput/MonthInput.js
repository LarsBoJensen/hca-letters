import React from "react";
import { Route } from 'react-router-dom';

class MonthInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleMonthChange(e) {
    this.props.onMonthChange(e.target.value);
  }

  render () {
    return (
      <Route path="/letter/:letterID/year/:year/month/:month" children={({match}) => (
        <div className="date-input label-input">
          <label htmlFor="month-input">Month</label>
          {" "}
          <input
            type="number"
            id="month-input"
            placeholder={match ? match.params.month : '00'}
            min={0}
            max={12}
            maxLength={2}
            onChange={this.handleMonthChange}
          />
        </div>
      )} />
    )}
}

export default MonthInput;