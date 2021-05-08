import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function App() {
  return (
    <div className="App container p-6">
      <h1 className="is-size-2 has-text-weight-bold mb-5">The Shoppies</h1>
      <div className="columns is-multiline">
        <div className="card px-6 py-3 mb-3 column is-full">
          <p className="has-text-weight-semibold pb-2">Movie Title</p>
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                className="input is-fullwidth"
                type="text"
                placeholder="Search for a movie"
              />
              <span className="icon is-small is-left ">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <div className="control">
              <button className="button is-link">Search</button>
            </div>
          </div>
        </div>

        <div className="column is-full-mobile card px-6 py-3">
          <p className="card-header-title">Results for "Ram"</p>
          <ul className="card-content">
            <li className="is-flex is-align-items-center mb-2">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
              <p className="px-4">Movie Name</p>
              <button className="button is-link" disabled>
                Nominate
              </button>
            </li>
            <li className="is-flex is-align-items-center mb-2">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
              <p className="px-4">Movie Name</p>
              <button className="button is-link">Nominate</button>
            </li>
            <li className="is-flex is-align-items-center mb-2">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
              <p className="px-4">Movie Name</p>
              <button className="button is-link">Nominate</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
