import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import PersonSelect from './PersonSelect/PersonSelect';
import YearInput from './YearInput/YearInput';
import MonthInput from './MonthInput/MonthInput';
import DayInput from './DayInput/DayInput';
import IDInput from './IDInput/IDInput';
import LetterList from './LetterList/LetterList';
import Letter from './Letter/Letter'
import Submit from './Submit/Submit';


class HCALetterApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: '',
      year: '0000',
      month: '00',
      day: '00',
      letterID: '',
      letterIDButtonIsActive: false
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
  }

  handlePersonChange(person) {
    const letterInPath = this.props.history.location.pathname.match(/\/letter\/[0-9]*/);
    this.setState({ person: person });
    if (person) {
      this.props.history.push(`/person/${person.value}${letterInPath}`);
    }
    else {
      this.props.history.push(`${letterInPath}`);
    }
  }

  handleDateChange(datePart, value) {

    let pathParts = {
      year: {
        value: this.state.year,
        pathPart: 'year',
        fallBackValue: '0000'
      },
      month: {
        value: this.state.month,
        pathPart: 'month',
        fallBackValue: '00'
      },
      day: {
        value: this.state.day,
        pathPart: 'day',
        fallBackValue: '00'
      }
    };

    pathParts[datePart].value = value;

    const pathArray = [];

    for (let path of Object.values(pathParts)) {
      if (path.value) {
        pathArray.push(
          `/${path.pathPart}/${path.value}`
        );
      }
      else {
        pathArray.push(
          `/${path.pathPart}/${path.fallBackValue}`
        );
      }
    }
    const letterInPath = this.props.history.location.pathname.match(/\/letter\/[0-9]*/);
    const path = `${pathArray.join('')}${letterInPath}`;
    this.props.history.push(path);
  }

  handleYearChange = (year) => {
    this.setState({ year: year });
    this.handleDateChange('year', year);
  };

  handleMonthChange(month) {
    this.setState({ month: month });
    this.handleDateChange('month', month);
  }

  handleDayChange(day) {
    this.setState({ day: day });
    this.handleDateChange('day', day);
  }

  handleLetterIDChange(letterID) {
    this.setState({ letterID: letterID });
    this.setState({letterIDButtonIsActive: letterID !== ''});
  }

  render() {

    const { person } = this.state;
    const personValue = person && person.value;

    return (
      <div className="App">
        <header>
          <h1>The Hans Christian Andersen Letters</h1>
          {/*<p>Letters to, from, and about <a href="https://en.wikipedia.org/wiki/Hans_Christian_Andersen">Hans Christian Andersen</a>.</p>*/}
          {/*<p>The content comes from <a href="http://andersen.sdu.dk/brevbase/" hreflang="da">the HCA research centre at the SDU</a> and is fetched via <a href="http://andersen.sdu.dk/service/index_e.html">their web services</a>.</p>*/}

          <div className="user-input">
            <form>
              <PersonSelect person={person} personValue={personValue} onPersonChange={this.handlePersonChange} />
              <div className="input-numbers">
                <div className="date-selection">
                  <YearInput onYearChange={this.handleYearChange} />
                  <MonthInput onMonthChange={this.handleMonthChange} />
                  <DayInput onDayChange={this.handleDayChange} />
                  <a href="https://github.com/LarsBoJensen/HCALetters/wiki/The-Data">why?</a>
                </div>
                <div className={`id-input-wrapper${this.state.letterIDButtonIsActive ? ' is-active' : ''}`}>
                  <IDInput letterID={this.state.letterID} onLetterIDChange={this.handleLetterIDChange} />
                  <Route path="/" children={({ match, history }) => (
                    <Submit
                      isActive={this.state.letterIDButtonIsActive}
                      letter={match && history.length === 2 ? match.params.letterID : this.state.letterID}
                      history={history}
                    />
                  )}
                  />
                </div>

              </div>
            </form>
          </div>
          <Route path="/person/:person" render={(props) => <LetterList {...props} person={this.state.person.value} year={this.state.year} month={this.state.month} day={this.state.day} />}
            />
          <Route path="/year/:year/month/:month/day/:day" render={(props) => <LetterList {...props} year={this.state.year} month={this.state.month} day={this.state.day} />}
            />
        </header>
        <Route path="/letter/:letterID" component={Letter} />
        <Route path="/year/:year/month/:month/day/:day/letter/:letterID" component={Letter} />
        <Route path="/person/:person/letter/:letterID" component={Letter} />
      </div>
    );
  }
}

export default HCALetterApp;
