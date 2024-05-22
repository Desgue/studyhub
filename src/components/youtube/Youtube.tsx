import React from "react";
import { SlRefresh } from "react-icons/sl";

const DEFAULT_PLAYLIST =
  "https://www.youtube-nocookie.com/embed/xl0NMRAnqbA?si=x9Pabci86r6ORfj5";
const URL_PREFIX = "https://www.youtube-nocookie.com/embed";
function Youtube() {
  const [inputVal, setInputVal] = React.useState("");
  const [playlistUrl, setPlaylistUrl] = React.useState(DEFAULT_PLAYLIST);
  const changePlaylist = () => {
    const cutoff = inputVal.lastIndexOf("/");
    const playListId = inputVal.slice(cutoff);
    setPlaylistUrl(URL_PREFIX + playListId);
    setInputVal("");
  };
  return (
    <div className="widget-container ">
      <div className="flex flex-col justify-center items-center pt-6">
        <iframe
          width="100%"
          height="315"
          src={playlistUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full p-4 flex gap-2 items-center ">
        <input
          placeholder="Cole a URl do Youtube aqui"
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
  );
}

export default Youtube;
