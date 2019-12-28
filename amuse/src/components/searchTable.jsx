import React from "react";

const SearchTable = ({ query, data, filter }) => {
  const {
    track: eTrack,
    artist: eArtist,
    album: eAlbum,
    playlist: ePlaylist
  } = filter;
  let isTrack, isAlbum, isArtist, isPlaylist;
  if (!data.error) {
    isTrack = eTrack && (data.tracks.total === 0 ? false : true);
    isAlbum = eAlbum && (data.albums.total === 0 ? false : true);
    isArtist = eArtist && (data.artists.total === 0 ? false : true);
    isPlaylist = ePlaylist && (data.playlists.total === 0 ? false : true);
  }
  return (
    <div className="result">
      {isTrack && (
        <div className="trackComp">
          <div className="topTrackSearch">
            <img
              id="topSearchImg"
              src={data.tracks.items[0].album.images[0].url}
              alt="trackImg"
            ></img>
          </div>
        </div>
      )}
      {isArtist && (
        <div className="artistComp">
          <div className="topArtistSearch">
            {data.artists.items[0].images.length && (
              <img
                id="topSearchImg"
                src={data.artists.items[0].images[0].url}
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
              src={data.albums.items[0].images[0].url}
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
              src={data.playlists.items[0].images[0].url}
              alt="trackImg"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTable;
