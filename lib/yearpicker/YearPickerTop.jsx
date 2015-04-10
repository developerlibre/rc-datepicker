'use strict';

import React from 'react';
import _ from 'lodash';

const YearPickerTop = React.createClass({

  propTypes: {
    visibleDate:         React.PropTypes.any.isRequired,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    className:           React.PropTypes.string.isRequired
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeVisibleDate(this.props.visibleDate);
  },

  render() {
    const year = this.props.visibleDate.year();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;
    return (
      <div className='top'>
        <div className='display'>
          <div className='button left' onClick={_.partial(this.changeYear, (year - 10))}>
            &lt;
          </div>
          <div className='button label fixed'>
            <strong className={this.props.textClassNames}>{startDecadeYear}-{endDecadeYear}</strong>
          </div>
          <div className='button right' onClick={_.partial(this.changeYear, (year + 10))}>
            &gt;
          </div>
        </div>
      </div>
    );
  }
});

export default YearPickerTop;