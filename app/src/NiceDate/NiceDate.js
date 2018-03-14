import React from "react";

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
     * language, but for now, I will just use `en-EN` as first argument.
     * Localized dates in a non-localized context look odd.
     */
    const dateTimeFormat = new Intl.DateTimeFormat('en-EN', dateOptions);

    // If the date is not entirely unknown
    if (!unknownDate) {
      /**
       * Todo:
       * JS dates and timezones is an interesting subject. The following code
       * works, but it may, due to timezone issues, return a date that is one
       * day too early. The current code works in my timezone, UTC+1:00, but it
       * should be tested further with/in other timezones.
       */
      // If the date format is valid (the data source contains invalid values).
      if (Date.parse(dateParts.join('-'))) {
        niceDate = dateTimeFormat.format(new Date(dateParts.join('-')));
      }
      else {
        niceDate = date;
        dateComment = 'Invalid date in the data source';
      }

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

export default NiceDate;