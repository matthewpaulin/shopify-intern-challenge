import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const API_KEY = "e88d2805";
  const [searchTerm, setSearchTerm] = useState("");
  const [listSearchTerm, setListSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const savedNominations = JSON.parse(localStorage.getItem("nominations"));
  const [nominations, setNominations] = useState(savedNominations || []);
  const [resultsExpanded, setResultsExpanded] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${API_KEY}`
    );
    const result = await response.json();
    if (result.Response === "True") {
      setMovieList(result.Search);
      setListLength(result.totalResults);
      setPageNum(1);
      setListSearchTerm(searchTerm);
    } else {
      setMovieList([]);
      setListLength(0);
    }
    setLoading(false);
  };

  const handleSearchMore = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?s=${listSearchTerm}&type=movie&page=${
        pageNum + 1
      }&apikey=${API_KEY}`
    );
    const result = await response.json();
    if (result.Response === "True") {
      setMovieList([...movieList, ...result.Search]);
      setListLength(result.totalResults);
      setPageNum(pageNum + 1);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => [setSearchTerm(e.target.value)];

  useEffect(() => {
    if (nominations.length === 5) window.scrollTo(0, 0);

    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations]);
  return (
    <>
      {nominations.length === 5 && (
        <section className="hero is-dark is-halfheight">
          <div>
            <div className="has-text-centered py-4">
              <p className="title">HERE ARE YOUR NOMINATIONS</p>
            </div>
            <ul className="card-content columns is-multiline">
              {nominations.map((movie) => (
                <li
                  className="column is-full is-6-tablet is-4-desktop has-text-centered"
                  key={movie.imdbID}
                  style={{ margin: "auto" }}>
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
                        alt={`no poster found`}
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
                        alt={`${movie.Title} poster`}
                      />
                    )}
                  </figure>
                  <p className="px-3 is-size-6 has-text-weight-medium">
                    {movie.Title} ({movie.Year})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="App container p-6">
        <h1 className="is-size-2 has-text-weight-bold mb-5">The Shoppies</h1>
        {listSearchTerm === "" && (
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
          {((movieList && movieList.length > 0) || loading) && (
            <div className="column is-full-tablet-only mb-3">
              <div className="card">
                <header className="card-header">
                  <p className="is-size-5 has-text-weight-semibold card-header-title">
                    Results for "{listSearchTerm}"
                  </p>
                  <span
                    className="card-header-icon"
                    onClick={() => setResultsExpanded(!resultsExpanded)}>
                    <span className="icon">
                      {(resultsExpanded && (
                        <FontAwesomeIcon icon={faAngleUp} />
                      )) || <FontAwesomeIcon icon={faAngleDown} />}
                    </span>
                  </span>
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
                                alt={`no poster found`}
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
                                alt={`${movie.Title} poster`}
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
                {loading && (
                  <div className="loader" style={{ margin: "auto" }}></div>
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
                        {(movie.Poster === "N/A" && (
                          <img
                            src="poster.png"
                            style={{
                              width: "5.4em",
                              height: "8em",
                              minWidth: "5.4em",
                              margin: "auto",
                            }}
                            alt={`no poster found`}
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
                            alt={`${movie.Title} poster`}
                          />
                        )}
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
    </>
  );
}

export default App;
