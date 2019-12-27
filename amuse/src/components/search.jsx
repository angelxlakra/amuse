import React, { Component } from "react";
import "../styles/search.css";
import axios from "axios";

class Search extends Component {
  state = {
    searched: false,
    query: "",
    filter: {
      artist: true,
      album: true,
      track: true,
      playlist: true
    },
    data: {}
  };

  async componentDidUpdate() {
    const access_token = localStorage.getItem("access_token");
    const { query, filter } = this.state;
    // console.log(query);
    if (query) {
      const searchData = await axios.get("http://localhost:8888/search/", {
        params: {
          query: query,
          access_token: access_token,
          filter: filter
        }
      });
      if (searchData.data.error) {
        alert("Your Session Expired, Login Again!!");
        window.location = "/logout";
      }
      this.setState({ searched: true, data: searchData.data });
    }
  }
  componentDidMount() {
    console.log("mount called");
  }

  handleSearch = e => {
    const query = e.target.value;
    setTimeout(() => {
      console.log("this just got laid here");
    }, 4000);
    if (query.length >= 3) {
      this.setState({ query });
    } else {
      console.log("searched must go false now");
      this.setState({ query: "", data: {}, searched: false });
    }
  };
  render() {
    const { searched, data, filter } = this.state;
    const { tracks, artists, albums, playlists } = data;
    let isTrack = false,
      isArtist = false,
      isAlbum = false,
      isPlaylist = false;
    if (searched) {
      if (filter.track && tracks.total !== 0) {
        isTrack = true;
      }
      if (filter.artist && artists.total !== 0) {
        isArtist = true;
      }
      if (filter.album && albums.total !== 0) {
        isAlbum = true;
      }
      if (filter.playlist && playlists.total !== 0) {
        isPlaylist = true;
      }
    }
    return (
      <div className="searchComponent">
        <div className="backCover"></div>
        <div className="searchContainer">
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="searchBox"
            placeholder="Search for Artists, Songs or Playlists..."
            onChange={this.handleSearch}
          ></input>
        </div>
        {searched && (
          <div className="result">
            {isTrack && (
              <div className="trackComp">
                <div className="topTrackSearch">
                  <img
                    id="topSearchImg"
                    src={tracks.items[0].album.images[0].url}
                    alt="trackImg"
                  ></img>
                </div>
              </div>
            )}
            {isArtist && (
              <div className="artistComp">
                <div className="topArtistSearch">
                  {artists.items[0].images.length && (
                    <img
                      id="topSearchImg"
                      src={artists.items[0].images[0].url}
                      alt="artistImg"
                    ></img>
                  )}
                </div>
              </div>
            )}
            {isAlbum && (
              <div className="albumComp">
                <div className="topAlbumSearch">
                  <img
                    id="topSearchImg"
                    src={albums.items[0].images[0].url}
                    alt="albumImg"
                  ></img>
                </div>
              </div>
            )}
            {isPlaylist && (
              <div className="playlistComp">
                <div className="topPlaylistSearch">
                  <img
                    id="topSearchImg"
                    src={playlists.items[0].images[0].url}
                    alt="trackImg"
                  ></img>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
