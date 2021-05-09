import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
function App() {
  const API_KEY = "e88d2805";
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [nominations, setNominations] = useState([]);
  const [resultsExpanded, setResultsExpanded] = useState(true);
  // const [warningVisibility, setWarningVisibility] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${API_KEY}`
    );
    const result = await response.json();
    console.log(result);
    if (result.Response === "True") {
      setMovieList(result.Search);
      setListLength(result.totalResults);
      setPageNum(1);
    } else {
      setMovieList([]);
      setListLength(0);
    }
  };

  const handleSearchMore = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&type=movie&page=${
        pageNum + 1
      }&apikey=${API_KEY}`
    );
    const result = await response.json();
    console.log(result);
    if (result.Response === "True") {
      setMovieList([...movieList, ...result.Search]);
      setListLength(result.totalResults);
      setPageNum(pageNum + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => [setSearchTerm(e.target.value)];
  return (
    <div className="App container p-6">
      <h1 className="is-size-2 has-text-weight-bold mb-5">The Shoppies</h1>
      {nominations.length === 0 && (
        <div className="notification is-link has-text-centered">
          Search for movies to nominate them.
        </div>
      )}
      <div className="columns is-multiline is-desktop">
        <div className="column is-full mb-3">
          <div className="card">
            <header className="card-header">
              <p className="is-size-5 has-text-weight-semibold card-header-title">
                Movie Title
              </p>
            </header>
            <div className="card-content field has-addons">
              <div className="control has-icons-left is-expanded">
                <input
                  className="input is-fullwidth"
                  type="text"
                  placeholder="Search for a movie"
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <span className="icon is-small is-left ">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
              <div className="control">
                <button className="button is-link" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {movieList && movieList.length > 0 && (
          <div className="column is-full-tablet-only mb-3">
            <div className="card">
              <header className="card-header">
                <p className="is-size-5 has-text-weight-semibold card-header-title">
                  Results for "{searchTerm}"
                </p>
                <a
                  className="card-header-icon"
                  onClick={() => setResultsExpanded(!resultsExpanded)}>
                  <span className="icon">
                    {(resultsExpanded && (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )) || <FontAwesomeIcon icon={faAngleDown} />}
                  </span>
                </a>
              </header>
              {resultsExpanded && (
                <div className="card-content">
                  <ul>
                    {movieList.map((movie) => (
                      <li
                        className="is-flex-tablet is-block-mobile is-align-items-center has-text-centered mb-2 is-flex-wrap-nowrap"
                        key={movie.imdbID}>
                        <figure className="image">
                          {(movie.Poster === "N/A" && (
                            <img
                              src="poster.png"
                              style={{
                                width: "5.4em",
                                height: "8em",
                                minWidth: "5.4em",
                                margin: "auto",
                              }}
                            />
                          )) || (
                            <img
                              src={movie.Poster}
                              style={{
                                width: "5.4em",
                                height: "8em",
                                minWidth: "5.4em",
                                margin: "auto",
                              }}
                            />
                          )}
                        </figure>
                        <p className="px-3 is-size-6 has-text-weight-medium">
                          {movie.Title} ({movie.Year})
                        </p>
                        {((nominations.includes(movie) ||
                          nominations.length === 5) && (
                          <button className="button is-link" disabled>
                            Nominate
                          </button>
                        )) || (
                          <button
                            className="button is-link"
                            onClick={() => {
                              // if (nominations.length >= 5) {
                              //   setWarningVisibility(true);
                              // } else
                              setNominations([...nominations, movie]);
                            }}>
                            Nominate
                          </button>
                        )}
                        <hr />
                      </li>
                    ))}
                  </ul>
                  {pageNum * 10 < listLength && (
                    <div className="has-text-centered">
                      <button
                        className="button is-link is-outlined is-rounded is-centered"
                        onClick={handleSearchMore}>
                        Show More
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {
          <div className="column is-narrow mb-3">
            <div className="card">
              <header className="card-header">
                <p className="is-size-5 has-text-weight-semibold card-header-title">
                  Nominations ({nominations.length} / 5)
                </p>
              </header>
              <ul className="card-content">
                {nominations.length === 0 && (
                  <p className="has-text-centered">Nothing here yet</p>
                )}
                {nominations.map((movie) => (
                  <li
                    className="is-flex-tablet is-block-mobile is-align-items-center has-text-centered mb-2 is-flex-wrap-nowrap"
                    key={movie.imdbID}>
                    <figure className="image">
                      {/* <img src="https://bulma.io/images/placeholders/64x64.png" /> */}
                      <img
                        src={movie.Poster}
                        style={{
                          width: "5.4em",
                          height: "8em",
                          minWidth: "5.4em",
                          margin: "auto",
                        }}
                      />
                    </figure>
                    <p className="px-3 is-size-6 has-text-weight-medium">
                      {movie.Title} ({movie.Year})
                    </p>

                    <button
                      className="button is-danger is-outlined"
                      onClick={() => {
                        setNominations(
                          nominations.filter(
                            (nomination) => nomination.imdbID !== movie.imdbID
                          )
                        );
                      }}>
                      Remove
                    </button>

                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
