import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class PersonSelect extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      selectedOption: '',
      people: {},
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleOnlineStatusChange = this.handleOnlineStatusChange.bind(this);
  }

  // Lifecycle hook
  componentDidMount() {
    /**
     * Fetch all persons from the web service when the component mounts.
     */
    fetch('https://nameless-tor-69195.herokuapp.com/http://andersen.sdu.dk/service/people')
      .then(response => {
        if (response.status === 200) {
          // if 200 ok
          return response.json()
            .then(data => {
              this.setState({ people: data });
            })
            .catch(err => {
              console.error('An error occurred', err);
            });
        }
        else {
          throw new Error('Something went wrong on the API server');
        }
      })
      .catch(err => {
        console.error(err);
        // Set app online status to 'offline' via a callback function
        this.handleOnlineStatusChange('offline');
      });
  }


  handlePersonChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onPersonChange(selectedOption);
  };

  handleOnlineStatusChange = (online) => {
    this.props.onOnlineStatusChange(online);
  };

  render() {
    const options = [];
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const massObject = this.state.people;
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
          placeholder="Please select a person..."
          value={value}
          onChange={this.handlePersonChange}
          options={options}
        />
      </div>
    );
  }
}

export default PersonSelect;