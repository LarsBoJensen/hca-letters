import React from "react";
import Person from '../Person/Person';
import { Route } from 'react-router-dom';

class Group extends React.Component {
  render() {

    const { people, correspondent } = this.props;
    const group = [];
    const preposition = correspondent === 'sender' ? 'from' : 'to';
    let groupElement = '';

    if (people) {
      let x = 0;
      for (let person of people) {
        x++;
        /**
         * The person ID is not in the JSON response from the web service and
         * must be isolated
         */
        let personIDMatch = person.Webpage.match(/[0-9]+$/);
        let personID = personIDMatch[0];
        /**
         * This condition is necessary because of a naming inconsistency in the
         * web service, and because JSON is case sensitive. Senders have a
         * 'First name', receivers a 'First Name'. Ugh.
         */
        if (correspondent === 'receiver') {
          group.push(
            <Route key={x} path="/" render={props => <Person {...props} personID={personID} firstName={person['First Name']} lastName={person['Last Name']} />} />,
            ', '
          );
        }
        else if (correspondent === 'sender') {
          group.push(
            <Route key={x} path="/" render={props => <Person {...props} personID={personID} firstName={person['First name']} lastName={person['Last name']} />} />,
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
      <span className={correspondent}>{groupElement} </span>
    );
  }
}

export default Group