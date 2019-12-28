import React, { Component } from "react";
import "../styles/search.css";
import axios from "axios";
import SearchTable from "./searchTable";
import { search } from "../middleware/util";

class Search extends Component {
  state = {
    loading: false,
    query: "",
    filter: {
      artist: true,
      album: true,
      track: true,
      playlist: true
    },
    data: null
  };

  search = async val => {
    this.setState({ loading: true });
    const { filter } = this.state;
    const access_token = localStorage.getItem("access_token");
    const res = await search(
      `http://localhost:8888/search?query=${val}&access_token=${access_token}&filter=${JSON.stringify(
        filter
      )}`
    );
    if (res) {
      if (res.error) {
        if (res.error.status === 401) {
          console.log("error", res.data.error);
          alert("Session Expired, Login Again");
          window.location = "/logout";
        }
      }
      this.setState({ loading: false, data: res });
    }
  };

  handleSearch = e => {
    this.search(e.target.value);
    this.setState({ query: e.target.value });
  };

  render() {
    const { query, data, filter } = this.state;
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
            onChange={e => {
              this.handleSearch(e);
            }}
          ></input>
        </div>
        {data && <SearchTable query={query} data={data} filter={filter} />}
      </div>
    );
  }
}

export default Search;
