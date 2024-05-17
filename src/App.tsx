import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
import Spotify from "./components/spotify/spotify";
import bg from "./assets/forestBG.jpg";

function App() {
  return (
    <>
      <div
        className="h-[100dvh] flex items-center justify-center bg-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <DWrapper>
          <Pomodoro />
        </DWrapper>
        <DWrapper>
          <Spotify />
        </DWrapper>
      </div>
    </>
  );
}

export default App;
