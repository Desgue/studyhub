import React from "react";
import { Button } from "../ui/button";

function Pomodoro() {
  return (
    <div className="text-center">
      <div className="text-right px-1"> x</div>
      <div className="flex">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button variant="ghost"> Pausa Curta </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button variant="ghost"> Pausa Longa </Button>
        </div>
      </div>
      <div className="text-7xl p-4"> 25:00 </div>
      <div className="flex items-center justify-center gap-1">
        <Button variant="ghost"> Iniciar </Button>

        <Button variant="ghost"> Resetar </Button>
      </div>
    </div>
  );
}

export default Pomodoro;
