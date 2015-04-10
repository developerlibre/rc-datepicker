'use strict';

import React from 'react';
import moment from 'moment';
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row from '../Row.jsx';
import DateUtils from '../utils/DateUtils';

const YearPickerBody = React.createClass({

    propTypes: {
      visibleDate:  React.PropTypes.any.isRequired,
      date:         DateUtils.evaluateDateProp,
      minDate:      DateUtils.evaluateDateProp,
      maxDate:      DateUtils.evaluateDateProp,
      onSelectDate: React.PropTypes.func.isRequired,
      mode:         React.PropTypes.string.isRequired,
      className:    React.PropTypes.string.isRequired
    },

    render() {
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const selectedYear = this.props.date ? this.props.date.year() : -1;

      const visibleYears = DateUtils.getVisibleYears(year);
      const years = visibleYears.years.map((_year, index) => {
        const date = moment([_year, 0, 1]);
        const isCurrent = index >= visibleYears.startCurrent && index <= visibleYears.endCurrent;
        return <Picker
          date={date}
          isSelected={selectedYear === _year}
          isCurrent={isCurrent}
          isEnabled={DateUtils.isInsideTheEnabledArea(date, this.props.minDate, this.props.maxDate)}
          onSelectDate={this.props.onSelectDate}
          mode={this.props.mode}
          key={index}
        />;
      });
      const nColumns = 4;
      const nRows = 3;
      const rows = Array.apply(null, Array(nRows)).map((n, index) =>
        <Row pickers={years.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />);

      return (
        <div className='body'>
          {rows}
        </div>
      );
    }
});

export default YearPickerBody;