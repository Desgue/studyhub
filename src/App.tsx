import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
import Spotify from "./components/spotify/spotify";
import bg from "./assets/forestBG.jpg";
import { usePomodoroPos } from "./Store/positionStore";
function App() {
  const { pomodoroPos, setPomodoroPos } = usePomodoroPos();
  return (
    <>
      <div
        className="h-screen flex items-center justify-center bg-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <DWrapper
          defaultX={pomodoroPos.x}
          defaultY={pomodoroPos.y}
          setPosition={setPomodoroPos}
        >
          <Pomodoro />
        </DWrapper>
        {/*         <DWrapper>
          <Spotify />
        </DWrapper> */}
      </div>
    </>
  );
}

export default App;
