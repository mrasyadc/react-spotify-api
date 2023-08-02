import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = "http://localhost:3000";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
];

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [page, setPage] = useState("search");

  function handleLogin() {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const queryParams = new URLSearchParams({
      client_id,
      response_type: "token",
      redirect_uri,
      scope: scopes.join(" "),
    });
    window.location = `${authEndpoint}?${queryParams}`;
  }

  useEffect(() => {
    function extractAccessToken() {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const token = hashParams.get("access_token");
      setAccessToken(token);
      window.localStorage.setItem("access_token", token);
    }

    if (!accessToken) {
      extractAccessToken();
    }
  }, [accessToken]);

  if (!accessToken) return <Login handleLogin={handleLogin} />;

  return page === "search" ? (
    <Search
      accessToken={accessToken}
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
      setPage={setPage}
    />
  ) : (
    <Recommendation accessToken={accessToken} setPage={setPage} />
  );
}

export default App;
