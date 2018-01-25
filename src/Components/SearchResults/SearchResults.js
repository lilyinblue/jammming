import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends Component {

  constructor(props){
    super(props);

    this.isRemoval = false;
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} isRemoval={this.isRemoval} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
