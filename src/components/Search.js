import React from 'react';
import Geosuggest from 'react-geosuggest';
import classNames from 'classnames';

export const Search = React.createClass({

  render() {
    return (
      <div className={classNames('searchBox', {
        'searchBox__expand': this.props.isSearch,
        'searchBox__offline': !this.props.isOnline
      })}>

        {(() => {
          if (this.props.isSearch) {
            return (
              <div className="searchBox__source">
                <div className="searchBox__source__legend"></div>
                <input
                  type="text"
                  placeholder="Current Location"
                  className="searchBox__source__input"
                />
              </div>
            );
          }
        })()}

        <div className="searchBox__destination">
          <div className="searchBox__destination__legend"></div>
          <Geosuggest
            location={new google.maps.LatLng(52.363632, 4.926588)}
            radius="20"
            onClick={this.props.gotoSearch}
            placeholder="Where to?"
            inputClassName="searchBox__destination__input"
            onSuggestSelect={this.props.onSuggestSelect}
          />
        </div>
      </div>
    );
  }
});

export default Search;