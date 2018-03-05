import React from "react";

function Person (props) {
  const firstName = props.firstName;
  const lastName = props.lastName;
  const fullName = [firstName, lastName].join(' ');
  return (<span className="person" dangerouslySetInnerHTML={{__html: fullName}} />);
}

export default Person;