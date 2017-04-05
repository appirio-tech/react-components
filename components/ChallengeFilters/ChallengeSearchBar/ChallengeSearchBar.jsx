/**
 * Search bar for the ChallengeFilters component.
 *
 * This component will trigger the callback provided via the 'onSearch'
 * property, if any, each time the user hits enter inside the input field,
 * or clicks on the search icon. It passes the search string into the first
 * callback argument.
 *
 * You may provide the 'placeholder' string property, to show a placeholder in
 * the input field.
 */

import React from 'react';
import './ChallengeSearchBar.scss';
import zoomIcon from './ui-zoom.svg';

const { func, string } = React.PropTypes;

class ChallengeSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onKeyPress(event) {
    switch (event.key) {
      case 'Enter':
        return this.onSearch();
      default:
        return null;
    }
  }

  onSearch() {
    if (this.props.onSearch) this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className="ChallengeSearchBar">
        <input
          onChange={event => this.setState({ value: event.target.value })}
          onKeyPress={event => this.onKeyPress(event)}
          placeholder={this.props.placeholder}
          type="text"
          value={this.state.value}
        />
        <span
          id="SearchButton"
          className={this.state.value ? 'active' : ''}
          onClick={() => this.onSearch()}
        >
          <img src={zoomIcon} />
        </span>
      </div>
    );
  }
}

ChallengeSearchBar.defaultProps = {
  onSearch: () => true,
  placeholder: '',
};

ChallengeSearchBar.propTypes = {
  onSearch: func,
  placeholder: string,
};

export default ChallengeSearchBar;
