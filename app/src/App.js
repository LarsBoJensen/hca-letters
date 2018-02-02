import React, { Component } from 'react';
import './App.css';
import data from './letters';
import allPeople from './people';


class PeopleSelect extends React.Component {
  render() {

    const mass = allPeople.MASS[0];
    const selectOptions = [];

    // iterate through people mass object
    for (let [key, person] of Object.entries(mass)) {
      // Remove first occurrence of comma. Unfortunately, we need that
      let personName = person.Name.replace(/,/,'');
      selectOptions.push(
        <option key={key} value={key}>{personName}</option>
      );
    }

    return (
      <div className="person-selection label-input">
        <label htmlFor="select-person">Sender / receiver</label>
        <select name="person" id="select-person">
          {selectOptions}
        </select>
      </div>
    );
  }
}

class DateInput extends React.Component {
  render() {
    return (
      <div className="date-selection">
        <YearInput />
        <MonthInput />
        <DayInput />
        <a href="https://github.com/LarsBoJensen/HCALetters/wiki/The-Data">why?</a>
      </div>
    );
  }
}

class SelectBar extends React.Component {
  render() {
    return (
      <div className="user-input">
        <h2>Find yours</h2>
        <form>
          <PeopleSelect />
          <div className="input-numbers">
            <DateInput />
            <IDInput />
          </div>
        </form>
      </div>
    );
  }
}

class YearInput extends React.Component {
  render() {
    return (
      <div className="date-input label-input">
        <label htmlFor="year-input">Year</label>
        {" "}
        <input type="number" id="year-input" placeholder={"0000"} min={0} max={2100} maxLength={4}/>
      </div>
    );
  }
}

class MonthInput extends React.Component {
  render() {
    return (
      <div className="date-input label-input">
        <label htmlFor="month-input">Month</label>
        {" "}
        <input type="number" id="month-input" placeholder={"00"} min={0} max={12} maxLength={2}/>
      </div>
    );
  }
}

class DayInput extends React.Component {
  render() {
    return (
      <div className="date-input label-input">
        <label htmlFor="day-input">Day</label>
        {" "}
        <input type="number" id="day-input" placeholder={"00"} min={0} max={31} maxLength={2}/>
      </div>
    );
  }
}

class IDInput extends React.Component {
  render() {
    return (
      <div className="id-input label-input">
        <label htmlFor="id-input">Letter ID</label>
        {" "}
        <input type="number" id="id-input" placeholder={"ID"} min={1} max={99999} maxLength={5}/>
      </div>
    );
  }
}


class NiceDate extends React.Component {
  render() {
    const date = this.props.date;
    const format = this.props.format;
    let niceDate = 'Invalid date';
    /**
     * The dates are not always valid. In fact, the format has been hacked
     * in order to be able to represent unknown data with naughts (year, month
     * and/or day). Examples: 0000-12-24 for Dec 24 in an unknown year,
     * 1827-08-00 for an unknown date in 1827. So we will take the date apart.
     */
    let dateParts = date.split('-');
    let validDateParts = [true, true, true];
    let dateOptions = {};
    const defaultDateFormat = format === 'compact'
      ? { year: 'numeric', month: 'numeric', day: 'numeric' }
      : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateComment = '';
    let unknownDate = false;

    dateParts.forEach((value, index) => {
      // If the date part consists of 0's only
      if (/^0+$/.test(value)) {
        // Replace the first 0 with a 1 in order to be able to Date() it
        dateParts = dateParts.slice(0);
        dateParts[index] = value.replace(/0/,'1');
        validDateParts[index] = false;
      }
    });

    validDateParts = validDateParts.toString();

    switch (validDateParts) {
      case 'true,true,true':
        // Complete, valid date
        dateOptions = defaultDateFormat;
        break;
      case 'true,true,false':
        dateOptions = { year: 'numeric', month: 'long' };
        dateComment = 'unknown day';
        break;
      case 'true,false,true':
        dateOptions = { year: 'numeric', day: 'numeric' };
        dateComment = 'unknown month';
        break;
      case 'true,false,false':
        dateOptions = { year: 'numeric' };
        dateComment = 'month and day are unknown';
        break;
      case 'false,true,true':
        dateOptions = { month: 'long', day: 'numeric' };
        dateComment = 'unknown year';
        break;
      case 'false,false,true':
        dateOptions = { day: 'numeric' };
        dateComment = 'year and month are unknown';
        break;
      case 'false,true,false':
        dateOptions = { month: 'long' };
        dateComment = 'year and day are unknown';
        break;
      case 'false,false,false':
        unknownDate = true;
        break;
      default:
        dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    }

    /**
     * Now that we have got the date formatting options, we create a date
     * formatter. It should perform better than toLocaleDateString(),
     * especially when many dates need to be formatted.
     * `navigator.languages[0]` returns the user's top priority browser
     * language, but for now, I will just use `en-EN`. Localized dates in a
     * non-localized context look odd.
     */
    const dateTimeFormat = new Intl.DateTimeFormat('en-EN', dateOptions);

    // If the date is not entirely unknown
    if (!unknownDate) {
      niceDate = dateTimeFormat.format(new Date(dateParts));
      niceDate += dateComment ? ' (' + dateComment + ')' : '';
    }
    else {
      niceDate = '(unknown date)';
    }

    return (
      <time dateTime={date}>{niceDate}</time>
    );
  }
}

class LetterListRow extends React.Component {
  render() {
    const letterRow = this.props.letterRow;
    return (
      <tr className="letterlist-row">
        <td className="sender">{letterRow['Sender name']}</td>
        <td className="receiver">{letterRow['Receiver name']}</td>
        <td className="date"><NiceDate date={letterRow.Date} /></td>
      </tr>
    );
  }
}

class LetterList extends React.Component {
  render() {
    const rows = [];

    // Necessary tampering of the letters JSON from the web service
    const letters = this.props.letters[0];

    for (let [key, letterHeader] of Object.entries(letters)){
      // Filter out web service metadata entries
      if(Number.isInteger(parseInt(key, 10))) {
        // Add letters to the list
        rows.push(
          <LetterListRow
          letterRow={letterHeader}
          key={letterHeader.ID} />
        );
      }
    }

    return(
      <table className="letterlist">
      <caption id="letterlist">List of letters</caption>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>On</th>
          </tr>
        </thead>
        <tbody tabIndex="0" role="list" aria-labelledby="letterlist">
          {rows}
        </tbody>
      </table>
    );
  }
}

class LetterVersion extends React.Component {
  render() {

    const type = this.props.type;
    const version = this.props.version;
    const updated = this.props.version['Version last updated'];
    const numberOfVersions = this.props.numberofversions;
    const number = this.props.number;

    /**
     * Handle missing text and/or publishing permission
     */

    function URLToLink(text) {
      const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
      const text1 = text.replace(exp, "<a href='$1'>$1</a>");
      let exp2 =/(^|[^/])(www\.[\S]+(\b|$))/gim;
      return (text1.replace(exp2, '$1<a href="http://$2">$2</a>'));
    }

    let content = `There is a version of the letter of the type <em>${this.props.type}</em> registered. Unfortunately, it may not be published here due to copyright issues. You may try to contact the owner.`;

    if (version.Public === 'true') {
      if (version.Text) {
        content = URLToLink(version.Text);
      } else {
        content = 'There is no text or description of this version of the letter.';
      }
    }

    // Create version header
    const versionHeader = [type];
    // If it is a text, and there is more than one version
    if (numberOfVersions > 1 && type === 'text') {
      versionHeader.push(
        <span className="metasuffix" key={number}> (version {number})</span>
      );
    }

    /**
     * Get and add meta information
     * Todo: add keys that make you look smart
     */

    const meta = [];

    if (version['Source name']) {
      meta.push(
        <p key="1">Source/owner: {version['Source name']}</p>
      );

      if(version['Item number in source']) {
        meta.push(
          <p key="2">Item number in source: {version['Item number in source']}</p>
        );
      }
    }

    meta.push(
      <p key="3">Last updated on <NiceDate date={updated} format={"compact"} /></p>
    );

    /**
     * Language(s)
     * Languages is an array, as a letter may contain passages in multiple
     * languages. There should be added a language attribute to the element
     * holding the letter content, as it is very often in a foreign language.
     * The first entry in the array will be used. That will be correct in most
     * cases.
     */

     const language = this.props.version.Languages[0];
     // Replace the proprietary lang value 'hca' with 'da'
     let lang = language === 'hca' ? 'da' : language;

    /**
     * Output
     */
    const letterClasses = `letter-version ${this.props.type}`;

    return(
      <div className={letterClasses}>
        <h3 className="version-header">{versionHeader}</h3>
        <div className="letter-text" lang={lang} dangerouslySetInnerHTML={{__html: content}} />
        <div className="letter-meta">{meta}</div>
      </div>
    );
  }
}

class References extends React.Component {
  render() {

    const references = [];
    // console.log(this.props.references);

    let x=0;
    for (let reference of this.props.references) {
      const itemTitle = reference['Item title'];
      const URL = reference['Webpage'];
      let itemNotes = '';
      if (reference['Comment on reference']) {
        itemNotes = <span className="reference-comment">{reference['Comment on reference']}</span>;
      }

      x++;
      references.push(
        <li className="literature" key={x}>
          <a className="literature-title" href={URL}>{itemTitle}</a>
           {itemNotes}
        </li>
      );
    }

    return(
      <div className="letter-references">
      <h3>References to sources and secondary literature for this letter</h3>
        <ul>{references}</ul>
      </div>
    );
  }
}

class Person extends React.Component {
  render() {

    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const fullName = [firstName, lastName].join(' ');

    return (
      <span className="person" dangerouslySetInnerHTML={{__html: fullName}} />
    );
  }
}

class Crowd extends React.Component {
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

class Letter extends React.Component {
  render() {

    const letter = this.props.letter[0];
    const letterID = letter['Letter ID'];
    const letterHeader = [];
    const senders = letter.Senders;
    const receivers = letter.Receivers;
    const letterDate = letter['Letter date'];
    const versions = letter.Versions;
    const numberOfVersions = letter.Versions.length;
    const letterContent = [];
    const references = letter['Bibliography references'];
    let referencesBlock = '';
    /**
     * Create a object to hold the versions. The object is used as a kind of
     * associative array. The key order maps to the the rendering order
     * of version types; first text versions, then originals and so on
     * @type {{text: Array, original: Array, image: Array, other: Array}}
     */
    const content = {
      text: [],
      original: [],
      image: [],
      other: []
    };

    /**
     * Create letter header displaying sender(s), receiver(s) and the date
     */

    if (senders.length > 0) {
      letterHeader.push (
        <Crowd key="1" correspondent="sender" people={senders} />
      );
    }

    if (receivers.length > 0) {
      letterHeader.push (
        <Crowd key="2" correspondent="receiver" people={receivers} />
      );
    }

    if (letterDate) {
      letterHeader.push (
        <NiceDate key="3" date={letterDate} />
      );
    }

    // Iterate through versions object values
    for (let version of versions) {

      // Adds versions to their respective type's arrays in the versions object
      switch(version.Type) {
        case 'tekst':
          content.text.push(version);
          break;
        case 'original':
          content.original.push(version);
          break;
        case 'grafisk':
          content.image.push(version);
          break;
        default:
          content.other.push(version);
      }
    }

    for (let [type, versions] of Object.entries(content)) {
      if (versions.length > 0) {
        let x = 1;
        versions.forEach((letter) => {
          letterContent.push (
            <LetterVersion type={type} version={letter} numberofversions={numberOfVersions} number={x} key={type+x} />
          );
          x++;
        });
      }
    }

    // References
    if (references.length > 0) {
      referencesBlock = <References references={references} />;
    }
    else {
      referencesBlock = null;
    }

    return (
      <section className="letter">
        <h2 className="letter-header"><span>Letter</span> {letterHeader}</h2>
        {letterContent}
        <h3 className="letter-id">Letter ID for reference: {letterID}</h3>
        {referencesBlock}
      </section>
    );
  }
}

class HCALetterApp extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>The Hans Christian Andersen Letters</h1>
          <SelectBar />
          <LetterList letters={data.LETTERS} />
        </header>
        <Letter letter={data.LETTER_dated_only_with_year}/>
      </div>
    );
  }
}

export default HCALetterApp;
