import React from "react";
import YearInput from './YearInput/YearInput';
import MonthInput from './MonthInput/MonthInput';
import DayInput from './DayInput/DayInput';

const DateInput = () => (
  <div className="date-selection">
    <YearInput />
    <MonthInput />
    <DayInput />
    <a href="https://github.com/LarsBoJensen/HCALetters/wiki/The-Data">why?</a>
  </div>
);

export default DateInput;