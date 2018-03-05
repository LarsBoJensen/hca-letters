import React from "react";
import Person from '../Person/Person';

class Group extends React.Component {
  render() {

    const people = this.props.people;
    const role = this.props.correspondent;
    const group = [];
    const preposition = role === 'sender' ? 'from' : 'to';
    let groupElement = '';

    if (people) {
      let x = 0;
      for (let person of people) {
        x++;
        /**
         * This condition is necessary because of a naming inconsistency in the
         * web service, and because JSON is case sensitive. Senders have a
         * 'First name', receivers a 'First Name'. Ugh.
         */
        if (role === 'receiver') {
          group.push(
            <Person key={x} firstName={person['First Name']} lastName={person['Last Name']} />,
            ', '
          );
        }
        else if (role === 'sender') {
          group.push(
            <Person key={x} firstName={person['First name']} lastName={person['Last name']} />,
            ', '
          );
        }
      }
    }

    // Removes last array item [', ']
    group.pop();

    const groupClass = group.length > 1 ? 'multiple' : 'single';

    if (group.length > 0) {
      groupElement = <span className={groupClass}>{preposition} {group}</span>;
    }

    return (
      <span className={role}>{groupElement} </span>
    );
  }
}

export default Group