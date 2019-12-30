import React, { Component } from "react";
import "../styles/search.css";
import axios from "axios";
import TopSearchTable from "./topSearchTable";
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
    try {
      console.log(res);
      this.setState({ loading: false, data: res });

      if (res && res.error && res.error.status === 401) {
        const rToken = localStorage.getItem("refresh_token");
        const aToken = await axios.get(
          "http://localhost:8888/auth/refresh_token/" + rToken
        );

        localStorage.setItem("access_token", aToken.data.access_token);
        alert("Tokens Refreshed");
        window.location = "/search";
      }
    } catch (error) {
      const rToken = localStorage.getItem("refresh_token");
      const aToken = await axios.get(
        "http://localhost:8888/auth/refresh_token/" + rToken
      );
      localStorage.setItem("access_token", aToken.data.access_token);
      alert("Tokens Refreshed");
      window.location = "/search";
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
            placeholder="Search for Artists, Songs or Albums..."
            onChange={e => {
              this.handleSearch(e);
            }}
          ></input>
        </div>
        {data && !data.error && (
          <h1 className="topResultHeader">Top Results</h1>
        )}
        {data && <TopSearchTable query={query} data={data} filter={filter} />}
      </div>
    );
  }
}

export default Search;
