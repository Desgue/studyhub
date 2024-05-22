import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
import Spotify from "./components/spotify/spotify";
import Youtube from "./components/youtube/Youtube";
import bg from "./assets/forestBG.jpg";
import {
  usePomodoroPos,
  useSpotifyPos,
  useYoutubePos,
} from "./Store/positionStore";
import useMediaQuery from "./Hooks/useMediaQuery";
import SideNav from "./components/Navbar/SideNav";
import {
  usePomodoroVisibility,
  useSpotifyVisibility,
  useYoutubeVisibility,
} from "./Store/visibilityStore";

function App() {
  const { pomodoroPos, setPomodoroPos } = usePomodoroPos();
  const { isPomodoroVisible } = usePomodoroVisibility();
  const { isSpotifyVisible } = useSpotifyVisibility();
  const { isYoutubeVisible } = useYoutubeVisibility();
  const { spotifyPos, setSpotifyPos } = useSpotifyPos();
  const { youtubePos, setYoutubePos } = useYoutubePos();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="fixed inset-0">
        <div className="inset-0 bg-cover block  absolute z-0">
          <img
            src={bg}
            alt="background image"
            className="object-cover h-full w-full "
          />
        </div>
      </div>
      <div className="md:h-screen flex py-12 md:p-0">
        <SideNav />
        {!isDesktop ? (
          <div className="w-full justify-center items-center flex flex-col gap-8 z-50">
            <Pomodoro />
            <Spotify />
            <Youtube />
          </div>
        ) : (
          <>
            <DWrapper
              defaultX={pomodoroPos.x}
              defaultY={pomodoroPos.y}
              setPosition={setPomodoroPos}
              visible={isPomodoroVisible}
            >
              <Pomodoro />
            </DWrapper>
            <DWrapper
              defaultX={spotifyPos.x}
              defaultY={spotifyPos.y}
              setPosition={setSpotifyPos}
              visible={isSpotifyVisible}
            >
              <Spotify />
            </DWrapper>
            <DWrapper
              defaultX={youtubePos.x}
              defaultY={youtubePos.y}
              setPosition={setYoutubePos}
              visible={isYoutubeVisible}
            >
              <Youtube />
            </DWrapper>
          </>
        )}
      </div>
    </>
  );
}

export default App;
