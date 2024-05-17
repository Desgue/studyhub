import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
import Spotify from "./components/spotify/spotify";
import bg from "./assets/forestBG.jpg";
import { usePomodoroPos, useSpotifyPos } from "./Store/positionStore";
import useMediaQuery from "./Hooks/useMediaQuery";
function App() {
  const { pomodoroPos, setPomodoroPos } = usePomodoroPos();
  const { spotifyPos, setSpotifyPos } = useSpotifyPos();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div
        className="h-screen flex items-center justify-center bg-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        {!isDesktop ? (
          <div className="flex flex-col items-center gap-4">
            <Pomodoro />
            <Spotify />
          </div>
        ) : (
          <>
            <DWrapper
              defaultX={pomodoroPos.x}
              defaultY={pomodoroPos.y}
              setPosition={setPomodoroPos}
            >
              <Pomodoro />
            </DWrapper>
            <DWrapper
              defaultX={spotifyPos.x}
              defaultY={spotifyPos.y}
              setPosition={setSpotifyPos}
            >
              <Spotify />
            </DWrapper>
          </>
        )}
      </div>
    </>
  );
}

export default App;
