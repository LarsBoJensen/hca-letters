import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class YearInput extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onYearChange(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const options = [
      { value: '0000', label: 'n/a' }
    ];

    for (let y=1805; y<=2000; y++) {
      options.push({
        value: `${y}`,
        label: `${y}`
      });
    }

    return (
        <div className="date-input label-input year-input">
          <label htmlFor="year-input">Year</label>
          {" "}
          <Select
            name="select-year"
            id="select-year"
            placeholder="..."
            value={value}
            onChange={this.handleYearChange}
            options={options}
          />
        </div>
    );
  }
}

export default YearInput;