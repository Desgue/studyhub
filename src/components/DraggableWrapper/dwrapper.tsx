import Draggable from "react-draggable";
import React from "react";

let GLOBAL_Z = 10;

export default function DWrapper({ children }: { children: any }) {
  const [z, setZIndex] = React.useState(0);
  return (
    <Draggable bounds="body" onMouseDown={() => setZIndex(++GLOBAL_Z)}>
      <div
        className="min-w-72 shadow-md rounded-md bg-[#121212] text-[#FFFFFF] bg-opacity-95     "
        style={{ zIndex: z, position: "absolute" }}
      >
        {children}
      </div>
    </Draggable>
  );
}
