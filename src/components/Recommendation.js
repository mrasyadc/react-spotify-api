import { React, useState } from "react";

function Recommendation({ accessToken, setPage }) {
  const [topList, setTopList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleInitiate = () => {
    const searchEndpoint = `v1/me/top/tracks?time_range=short_term&limit=5`;
    fetch(searchEndpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => setTopList(data.tracks.items))
      .catch((error) => console.log(error));
  };

  handleInitiate();

  // const initiate = async () => {
  //   async function fetchWebApi(endpoint, method, body) {
  //     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       method,
  //       body: JSON.stringify(body),
  //     });
  //     return await res.json();
  //   }

  //   async function getTopTracks() {
  //     return (
  //       await fetchWebApi(
  //         "v1/me/top/tracks?time_range=short_term&limit=5",
  //         "GET"
  //       )
  //     ).items;
  //   }

  //   const topTracks = await getTopTracks().catch((e) => console.error(e));
  //   console.log(
  //     topTracks?.map(
  //       ({ name, artists }) =>
  //         `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  //     )
  //   );
  // const topTracks = await getTopTracks();
  // console.log("top tracks");
  // console.log(topTracks);

  // async function getRecommendations() {
  //   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  //   return (
  //     await fetchWebApi(
  //       `v1/recommendations?limit=5&seed_tracks=${topTracks.id.join(",")}`,
  //       "GET"
  //     )
  //   ).tracks;
  // }

  // const recommendedTracks = await getRecommendations().items;

  // setRecommendations(recommendedTracks.items);
  // };

  // initiate();

  const renderRecommendations = () => {
    return (
      <div id="search-results">
        {topList.map((track) => (
          <div key={track.id}>
            <p>{track.name}</p>
            <p>by {track.artists[0].name}</p>
            {/* <button
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
            </button> */}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <button
        onClick={() => {
          setPage("search");
        }}
      >
        Go to Search
      </button>
      <h1 style={{ textAlign: "center" }}>Recommendations</h1>
      {topList.length > 0 && renderRecommendations()}
    </div>
  );
}

export default Recommendation;
