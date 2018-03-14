import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MonthInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleMonthChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onMonthChange(selectedOption);
  };


  render () {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const options = [
      { value: '00', label: 'n/a' }
    ];

    for (let y=1; y<=12; y++) {
      options.push({
        value: `${y}`,
        label: `${y}`
      });
    }

    return (
      <div className="date-input label-input">
        <label htmlFor="month-input">Month</label>
        {" "}
        <Select
          name="select-month"
          id="select-month"
          placeholder="..."
          value={value}
          onChange={this.handleMonthChange}
          options={options}
        />
      </div>
    )}
}

export default MonthInput;