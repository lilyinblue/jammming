let accessToken = '';
const clientID = 'bfd13971f3354e1998b1ccb292f54023';
const redirectURI = 'http://slh-jammming.surge.sh';

const Spotify = {

  getAccessToken() {
    if(accessToken) return accessToken;

    let token = window.location.href.match(/access_token=([^&]*)/);
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/);    

    if (token && expiresIn) {
      accessToken = token[1];
      const expiration = Number(expiresIn[1]);

      window.setTimeout(() => accessToken = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }    
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: headers });
    let jsonResponse = await response.json();
      
    if(jsonResponse.tracks) {   
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }    
  },

  async savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs.length) return;

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID = '';

    //Requesting user ID
    let response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
    let jsonResponse = await response.json();
    
    userID = jsonResponse.id;

    //Creating new Playlist
    response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: { 
        Authorization: `Bearer ${accessToken}`, 
        'Content-Type': 'application/json' 
      }, 
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    });
    jsonResponse = await response.json();

    let playlistID = jsonResponse.id;

    //Adding tracks to Playlist
    response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      headers: { 
        Authorization: `Bearer ${accessToken}`, 
        'Content-Type': 'application/json' 
      }, 
      method: 'POST',
      body: JSON.stringify({'uris': trackURIs})
    });
    jsonResponse = await response.json();
  }
}

export default Spotify;
