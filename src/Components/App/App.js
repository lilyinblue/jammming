import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],      
      playlistTracks: [],
      playlistName: "New Playlist"
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  addTrack(track) {
    const hasTrack = this.state.playlistTracks.find(element => {
      return element.id === track.id;
    })

    if(!hasTrack) {
      const newPlaylistTracks = this.state.playlistTracks;

      newPlaylistTracks.push(track);

      this.setState({playlistTracks: newPlaylistTracks});
    }
  }

  removeTrack(track) {
    const newPlaylistTracks = [];

    for(let i = 0; i < this.state.playlistTracks.length; i++){
      const element = this.state.playlistTracks[i];
      
      if(element.id !== track.id){
         newPlaylistTracks.push(element);
      }
    }

    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
