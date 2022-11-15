/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import _ from 'lodash';
import axios from 'axios';

const BASE_URL = 'http://localhost:3035/';
class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: false,
      searchResults: [],
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch = _.debounce(({ target: { value } }) => {
    if (value.length < 2) return;
    axios
      .get(`${BASE_URL}?query=${value}`)
      .then(({ data: searchResults }) => this.setState({ searchResults }))
      .catch((error) => alert(error.message));
  }, 1500);

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? 'showing ' : '') + 'search-container'
          }>
          <input
            type="text"
            onChange={(e) => {
              e.persist();
              this.onSearch(e);
            }}
          />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
          {this.state.searchResults.length > 0 && (
            <div className="search-results">
              {this.state.searchResults.map(({ _id, name, about, picture }) => (
                <div key={_id} className="search-item">
                  <img src={picture} height={100} />
                  <div className="text-box">
                    <h3>{name}</h3>
                    <p className="helper">{about.substring(0, 150)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
