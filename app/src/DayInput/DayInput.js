import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DayInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onDayChange(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const options = [
      { value: '00', label: 'n/a' }
    ];

    for (let y=1; y<=31; y++) {
      options.push({
        value: `${y}`,
        label: `${y}`
      });
    }

    return (
      <div className="date-input label-input">
        <label htmlFor="day-input">Day</label>
        {" "}
        <Select
          name="select-day"
          id="select-day"
          placeholder="..."
          value={value}
          onChange={this.handleDayChange}
          options={options}
        />
      </div>
    );
  }
}

export default DayInput;