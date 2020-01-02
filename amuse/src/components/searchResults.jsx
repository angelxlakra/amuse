import React from "react";

const SearchResults = ({ type, data }) => {
  const img_path = "album.images";
  return (
    <div className="searchresult">
      <h1 className="resultLabel">{type}</h1>
      {data &&
        data.items.map(result => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={result.external_urls.spotify}
            className="singleResult"
          >
            {type === "song" && (
              <img
                className="resultImage"
                src={result.album.images[0] && result.album.images[0].url}
              ></img>
            )}
            {type !== "song" && (
              <img
                className="resultImage"
                src={result.images[0] && result.images[0].url}
              ></img>
            )}
            <h3 className="searchName">{result.name}</h3>
          </a>
        ))}
    </div>
  );
};

export default SearchResults;
