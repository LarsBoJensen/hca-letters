import React from "react";
import allPeople from "../people";
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class PersonSelect extends React.Component {

  constructor (props) {
    super(props);
    this.handlePersonChange = this.handlePersonChange.bind(this);

    this.state = {
      selectedOption: '',
    }
  }

  handlePersonChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onPersonChange(selectedOption);
  };

  render() {
    const options = [];
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const massObject = allPeople.MASS[0];
    const peopleArray = Object.entries(massObject);
    const sortedPeople = peopleArray.sort((a, b) => {
      let x = a[1].Name.toLowerCase();
      let y = b[1].Name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    for (let i=0; i<sortedPeople.length; i++) {
      let key = sortedPeople[i][0];
      let person = sortedPeople[i][1];
      /**
       * Remove first occurrence of comma. That is necessary due to a data
       * formatting issue in the web service
       */
      let personName = person.Name.replace(/,/, '');
      options.push ({
        value: key,
        label: personName
      });
    }

    return (
      <div className="person-selection label-input">
        <label htmlFor="select-person">Sender / receiver</label>
        <Select
          name="select-person"
          id="select-person"
          value={value}
          onChange={this.handlePersonChange}
          options={options}
        />
      </div>
    );
  }
}

export default PersonSelect;