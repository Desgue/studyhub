import DWrapper from "./components/DraggableWrapper/dwrapper";
import Pomodoro from "./components/pomodoro/pomodoro";
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
      </div>
    </>
  );
}

export default App;
