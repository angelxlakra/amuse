import React from "react";
import SearchResults from "./searchResults";

const SearchTable = ({ data, filter }) => {
  return (
    <div>
      {data && data.tracks && (
        <SearchResults type="song" data={data.tracks}></SearchResults>
      )}
      {data && data.artists && (
        <SearchResults type="artist" data={data.artists}></SearchResults>
      )}
      {data && data.albums && (
        <SearchResults type="album" data={data.albums}></SearchResults>
      )}
      {data && data.playlists && (
        <SearchResults type="playlist" data={data.playlists}></SearchResults>
      )}
    </div>
  );
};

export default SearchTable;
