import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends Component {

  constructor(props){
    super(props);

    this.isRemoval = true;

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const newName = event.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} isRemoval={this.isRemoval} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
