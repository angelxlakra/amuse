import React from "react";
import TopSearchResult from "./topSearchResult";

const TopSearchTable = ({ query, data, filter }) => {
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
      {isTrack && <TopSearchResult type="track" items={data.tracks.items} />}
      {isAlbum && <TopSearchResult type="album" items={data.albums.items} />}
      {isArtist && <TopSearchResult type="artist" items={data.artists.items} />}
      {isPlaylist && (
        <TopSearchResult type="playlist" items={data.playlists.items} />
      )}
    </div>
  );
};

export default TopSearchTable;
