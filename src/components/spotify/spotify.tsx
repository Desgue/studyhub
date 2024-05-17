import React from "react";
import { SlRefresh } from "react-icons/sl";

const DEFAULT_PLAYLIST =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn";

const Spotify = () => {
  const [playlistUrl, setPlaylistUrl] = React.useState(DEFAULT_PLAYLIST);
  const [inputVal, setInputVal] = React.useState("");

  const changePlaylist = () => {
    if (!playlistUrl.startsWith("https://open.spotify.com/playlist")) {
      alert("playlist invalid");
      setInputVal("");
      return;
    }

    const embed = "/embed";
    // https://open.spotify.com/playlist/5mcjJZy3Pgr2YH5b1wYHpa
    const domain = inputVal.slice(0, 24);
    const path = inputVal.slice(24);

    const fullUrl = domain + embed + path;
    setPlaylistUrl(fullUrl);
    console.log(fullUrl);
    setInputVal("");
  };

  return (
    <div className="min-w-72 shadow-md rounded-md bg-[#121212] text-[#FFFFFF] bg-opacity-95 ">
      <div className="flex flex-col justify-center items-center p-4">
        <iframe
          style={{ borderRadius: "12px" }}
          src={`${playlistUrl}?utm_source=generator&theme=0`}
          width="90%"
          height="352"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <div className="w-full p-4 flex gap-2 items-center ">
          <input
            placeholder="Cole a URl do Spotify aqui"
            type="url"
            className="w-full rounded-lg bg-[#313131] text-[#FFFFFF] bg-opacity-95 p-1  "
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button className="hover:cursor-pointer" onClick={changePlaylist}>
            <SlRefresh className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spotify;
