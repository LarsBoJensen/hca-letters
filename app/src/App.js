import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.css';
import PersonSelect from './PersonSelect/PersonSelect';
import IDInput from './IDInput/IDInput';
import DateValidator from './DateValidator/DateValidator';
import LetterListWrapper from './LetterList/LetterListWrapper';
import Letter from './Letter/Letter'
import Submit from './Submit/Submit';
import Biography from './People/Biography/Biography';


class HCALetterApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: null,
      year: null,
      month: null,
      day: null,
      letterID: '',
      letterIDButtonIsActive: false,
      letterDrawerIsOpen: true,
      onlineStatus: 'online',
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleLetterIDChange = this.handleLetterIDChange.bind(this);
    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.handleOnlineStatusChange = this.handleOnlineStatusChange.bind(this);
  }

  handlePersonChange(person) {
    this.setState({ person: person });

    const letterInPath = this.props.history.location.pathname.match(/letter\/[0-9]+/);
    const pathExtension = [];

    if (person && person.value !== '') {
      pathExtension.push(`person/${person.value}`);
      if (letterInPath !== null) {
        pathExtension.push(`${letterInPath}`);
      }
    }
    else if (letterInPath !== null) {
      pathExtension.push(`${letterInPath}`);
    }

    this.props.history.push(`/${pathExtension.join('/')}`);
  }

  handleDateChange(datePart, value) {

    this.setState({ person: null })
    let pathParts = {
      year: {
        value: this.state.year,
        pathPart: 'year',
      },
      month: {
        value: this.state.month,
        pathPart: 'month',
      },
      day: {
        value: this.state.day,
        pathPart: 'day',
      }
    };

    pathParts[datePart].value = value;

    const pathArray = [];

    for (let path of Object.values(pathParts)) {
      if (path.value && path.value.value) {
        pathArray.push (
          `/${path.pathPart}/${path.value.value}`
        );
      }
    }
    const letterInPath = this.props.history.location.pathname.match(/\/letter\/[0-9]+/);
    pathArray.push(letterInPath);
    const path = `/date${pathArray.join('')}`;
    this.props.history.push(path);
  }

  handleLetterIDChange(letterID, letterDrawerIsOpen=true) {
    this.setState({ letterID: letterID, letterDrawerIsOpen: letterDrawerIsOpen });
    this.setState({letterIDButtonIsActive: letterID !== ''});
  }

  handleKeyboardEvent(keyBoardEvent) {
    // If the user hits Enter and the ID input field is not empty
    if (keyBoardEvent === 'Enter' && this.state.letterID !== '') {
      this.setState({ letterDrawerIsOpen: true });
      this.props.history.push(`/letter/${this.state.letterID}`);
    }
  }

  handleOnlineStatusChange(onlineStatus) {
    this.setState({ onlineStatus: onlineStatus });
  }

  render() {

    const { person, year, month, day } = this.state;
    const personValue = person && person.value;
    const yearValue = year && year.value;
    const monthValue = month && month.value;
    const dayValue = day && day.value;

    return (
      <section className="App">
        <header className={this.props.location.pathname === '/' ? 'front' : 'not-front'}>
          <h1 onClick={() => this.props.history.push('/')}>The Hans Christian Andersen Letters</h1>

          {this.state.onlineStatus === 'offline' ? <p className="error">You seem to be offline.</p> : ''}

          <Tabs
            defaultFocus={false}
            defaultIndex={0}
          >
            <TabList>
              <Tab><i className="tab-icon" id="icon-person"/><span className="tab-text">Person</span></Tab>
              <Tab><i className="tab-icon" id="icon-id"/><span className="tab-text">ID</span></Tab>
            </TabList>

            <TabPanel>
              <div className="selector">
                <PersonSelect person={person} personValue={personValue} onPersonChange={this.handlePersonChange} onOnlineStatusChange={this.handleOnlineStatusChange} />
              </div>

              {/* Render about-text only at "/" */}
              <Route exact path="/" render={() =>
                <div className="help">

                <div className="error" style={{ textAlign: 'left' }}>
                  <h2>
                    Bad news:
                  </h2>
                  <p>
                    The web service at https://andersen.sdu.dk/service/ fails to deliver data needed by this app.
                  </p>
                  <p>
                    It is thus not possible to search/browse/filter letters by date anymore, not here nor on the website <a href="https://andersen.sdu.dk/brevbase/">https://andersen.sdu.dk/brevbase/</a> itself, among other issues.
                  </p>
                  <p>
                    Until these problems get solved, this app is reduced to picking letters by ID and seeing the dropdown with people. The dropdown is filtered by typing in the field, so it is a fine way to at least find people. Unfortunately, selecting a person does not display a list of letters as it used to. Again, the error is to be fixed at https://andersen.sdu.dk.
                  </p>
                </div>

                  <h2>What This App Lets You Do</h2>
                  <p>This app lets you browse more than 10,000 letters to, from, and about <a href="https://en.wikipedia.org/wiki/Hans_Christian_Andersen">Hans Christian Andersen</a>.</p>
                  <p>You can <del>select a person or a date (range) or</del> enter an ID of a letter, if you should know one.</p>
                  <p>You can filter the lists (person<del>, day, month, and year</del>) by entering text/numbers into the fields.</p>
                  <p>The content comes from <a href="https://andersen.sdu.dk/brevbase/" hrefLang="da">the HCA research centre at the SDU</a> and is fetched via <a href="https://andersen.sdu.dk/service/index_e.html">their web services</a>.</p>
                  <p>You can return to this page and have the help texts displayed by clicking the header.</p>
                  <p>The app is created by <a href="https://larsbojensen.eu">Lars Bo Jensen</a>. It is based on <a href="https://reactjs.org/">React</a> and Facebook's <a href="https://github.com/facebook/create-react-app">create-react-app</a>. And sweat.</p>
                  <p>Get the code at <a href="https://github.com/LarsBoJensen/hca-letters">https://github.com/LarsBoJensen/hca-letters</a>.</p>
                </div>
              }/>
            </TabPanel>
            <TabPanel>
              <Route path="/" children={({ history }) => (
                <div className={`id-input-wrapper selector${this.state.letterIDButtonIsActive ? ' is-active' : ''}`}>
                  <IDInput letterID={this.state.letterID} onLetterIDChange={this.handleLetterIDChange} onKeyboardEvent={this.handleKeyboardEvent} history={history} />
                  <Submit isActive={this.state.letterIDButtonIsActive} letter={this.state.letterID} history={history} onLetterIDChange={this.handleLetterIDChange} />
                </div>
              )} />

              <Route exact path="/" render={() =>
                <div className="help">
                  <h2>Getting a letter by ID</h2>
                  <p>The letter ID's have found their way into printed literature, so it is not entirely unthinkable that you might know one. Enter it here and get the letter.</p>
                  <p>Please notice that the ID's are not an unbroken sequence of numbers. The ID's do not start at 1, and there are many 'empty slots'.</p>
                </div>
              }/>

            </TabPanel>
          </Tabs>
        </header>

        <Route path="*/letter/:letterID" render={(match) => <Letter url={match} open={this.state.letterDrawerIsOpen ? 'open' : 'closed'} onLetterIDChange={this.handleLetterIDChange} />
        } />

        <Route path="/person/:personID/show" component={Biography} />

        <Switch>
          <Route path="/person/:person" render={(props) => <LetterListWrapper {...props} onLetterIDChange={this.handleLetterIDChange} />} />
          <Route path="/date/year/:year/month/:month/day/:day" render={(props) => <LetterListWrapper {...props} onLetterIDChange={this.handleLetterIDChange} />} />
          <Route path="/date/year/:year/month/:month" render={(props) => <LetterListWrapper {...props} onLetterIDChange={this.handleLetterIDChange} />} />
        </Switch>

      </section>
    );
  }
}

export default HCALetterApp;
