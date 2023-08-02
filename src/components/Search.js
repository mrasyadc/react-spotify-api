import { React, useState } from "react";

function Search({ accessToken, currentTrack, setCurrentTrack, setPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchTerm
    )}&type=track`;
    fetch(searchEndpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data.tracks.items))
      .catch((error) => console.log(error));
  }

  function handlePlay(trackUri) {
    const playEndpoint = "https://api.spotify.com/v1/me/player/play";
    fetch(playEndpoint, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ uris: [trackUri] }),
    }).catch((error) => console.log(error));
  }

  function renderSearchResults() {
    return (
      <div id="search-results">
        {searchResults.map((track) => (
          <div key={track.id}>
            <p>{track.name}</p>
            <p>by {track.artists[0].name}</p>
            <button
              onClick={() => {
                handlePlay(track.uri);
                setCurrentTrack(`${track.name} by ${track.artists[0].name}`); // Update the currentTrack state
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => {
          setPage("recommendation");
        }}
      >
        Recommendation
      </button>
      <h1 style={{ textAlign: "center" }}>Search Musics</h1>
      <form
        style={{ textAlign: "center", margin: "50px" }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit">Search</button>
      </form>
      {currentTrack && (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Now playing: {currentTrack}
        </p>
      )}{" "}
      {searchResults.length > 0 && renderSearchResults()}
      {/* Add the currently playing track */}
    </div>
  );
}

export default Search;
