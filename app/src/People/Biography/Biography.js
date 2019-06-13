import React from 'react';
import { connect } from 'react-refetch';
import NiceDate from '../../NiceDate/NiceDate';

const PersonMetaData = (props) => {

  const { info } = props;
  const name = [];

  if (info['First name'] !== null && info['First name'] !== '') {
    name.push(info['First name']);
  }

  if (info['Last name'] !== null && info['Last name'] !== '') {
    name.push(info['Last name']);
  }

  const bio = [];
  const infoKeys = [
    'Title',
    'Biographical description',
    'Family relations',
  ];

  for (let key of infoKeys) {
    if (info[key] !== null && info[key] !== '') {
      bio.push(
        <span key={key} dangerouslySetInnerHTML={{__html: info[key]}} />,
        ', '
      );
    }
  }
  // Removes last array item [', ']
  bio.pop();

  const timeAndNationality = [];
  if (info['Born'] !== null) {
    timeAndNationality.push (
      '* ',
      <NiceDate key="Born" date={info['Born']} format="compact" />,
    );
  }
  if (info['Born'] !== null && info['Died'] !== null) {
    timeAndNationality.push(', ')
  }
  if (info['Died'] !== null) {
    timeAndNationality.push (
      '† ',
      <NiceDate key="Died" date={info['Died']} format="compact" />
    );
  }
  if (info['Home country'] !== null && info['Home country'] !== '') {
    if (timeAndNationality.length > 0) {
      timeAndNationality.push (', ');
    }
    timeAndNationality.push (
      info['Home country'],
      '.'
    )
  }

  return (
    <section className="person-card" lang="da">
      <h2 className="name">{name.join(' ')}</h2>
      <p className="time-and-nationality">{timeAndNationality.length > 0 ? timeAndNationality : ''}</p>
      <p className="curriculum">{bio}</p>
      <span className="note">These data are only available in Danish</span>
    </section>
  );
};

const Biography = (props) => {

  const { fetch } = props;

  if (fetch.pending) {
    return <p className="fetch-message">Fetching information about the selected person. Please wait...</p>
  } else if (fetch.rejected || (fetch.fulfilled && fetch.value === null)) {
    // return <Error error={fetch.reason}/>
    return <p className="fetch-message">An error occurred. Or, more likely, there is no person in the database with the ID {props.match.params.personID}.</p>
  } else if (fetch.fulfilled && fetch.value !== null) {
    return <PersonMetaData info={fetch.value}/>
  }
};


const API = 'https://andersen.sdu.dk/service/people/';

export default connect(props => ({
  fetch: {
    url: `${API}${props.match.params.personID}?htmlencode=false`,
    headers: {
      'Content-Type': ''
    }
  }
}))(Biography)
