import React from "react";

class Person extends React.Component {
  constructor (props) {
    super(props);

    this.handlePersonChange = this.handlePersonChange.bind(this);
  }

  handlePersonChange = (personID) => {
    const letterInPath = this.props.history.location.pathname.match(/\/letter\/[0-9]+/);
    this.props.history.push(`/person/${personID}${letterInPath}`);
  };

  render () {
    const { firstName, lastName, personID } = this.props;
    const fullName = [firstName, lastName].join(' ');

    return (
      <span className="person" dangerouslySetInnerHTML={{__html: fullName}} onClick={() => { this.handlePersonChange(personID) }}/>
    );
  }
}

export default Person;