import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
import Spotify from "./components/spotify/spotify";
import Youtube from "./components/youtube/Youtube";
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
import CozyShop from "./components/backgrounds/CozyShop/CozyShop";

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
        <CozyShop />
      </div>
      <div className="overflow-auto md:overflow-hidden  fixed inset-0 h-screen">
        <SideNav />
        <div className="md:h-screen py-4 flex md:p-0">
          {!isDesktop ? (
            <div className="w-full justify-center items-center flex flex-col gap-8 z-50">
              <div className={isPomodoroVisible ? "" : "absolute hidden"}>
                <Pomodoro />
              </div>
              <div className={isSpotifyVisible ? "" : "absolute hidden"}>
                <Spotify />
              </div>
              <div className={isYoutubeVisible ? "" : "absolute hidden"}>
                <Youtube />
              </div>
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
      </div>
    </>
  );
}

export default App;
