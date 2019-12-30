import React from "react";

const TopSearchResult = ({ type, items }) => {
  let img_url,
    label,
    showAuthor = false;
  if (type === "track") {
    showAuthor = true;
    label = "SONG";
    img_url = items[0].album.images[0].url;
  } else {
    if (type === "album") {
      showAuthor = true;
    }
    label = type;
    if (items[0].images.length) {
      img_url = items[0].images[0].url;
    } else {
      img_url =
        "https://developer.spotify.com/assets/branding-guidelines/icon1@2x.png";
    }
  }

  return (
    <div className="searchComp">
      <div className="topSearch">
        <h1 className="topLabel">{label}</h1>
        <img id="topSearchImg" src={img_url} alt="trackImg"></img>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={items[0].external_urls.spotify}
          className="topSearchName"
        >
          {items[0].name}
        </a>
        {showAuthor &&
          items[0].artists.map(author => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={author.external_urls.spotify}
              className="topSearchAuthor"
            >
              {author.name}
            </a>
          ))}
      </div>
    </div>
  );
};

export default TopSearchResult;
