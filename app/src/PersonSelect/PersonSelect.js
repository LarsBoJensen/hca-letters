import React from "react";
import allPeople from "../people";

class PersonSelect extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      person: ''
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
  }

  handlePersonChange(e) {
    this.setState({
      person: e.target.value
    });
    this.props.onPersonChange(e.target.value);
  }

  render() {

    const selectOptions = [];
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
       * Remove first occurrence of comma. That is necessary due to an data
       * formatting issue in the web service
       */
      let personName = person.Name.replace(/,/, '');
      selectOptions.push (
        <option key={key} value={key}>{personName}</option>
      );
    }

    return (
      <div className="person-selection label-input">
        <label htmlFor="select-person">Sender / receiver</label>
        <select name="person" id="select-person" onChange={this.handlePersonChange}>
          {selectOptions}
        </select>
      </div>
    );
  }
}

export default PersonSelect;