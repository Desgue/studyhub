import Draggable from "react-draggable";
import React from "react";

let GLOBAL_Z = 10;

export default function DWrapper({
  children,
  defaultX,
  defaultY,
  setPosition,
}: {
  children: any;
  defaultX: number;
  defaultY: number;
  setPosition: any;
}) {
  const [z, setZIndex] = React.useState(0);
  return (
    <>
      <Draggable
        bounds="parent"
        onMouseDown={() => setZIndex(++GLOBAL_Z)}
        onStop={(_, data) => {
          setPosition(data.x, data.y);
          console.log(data.x, data.y);
        }}
        position={{ x: defaultX, y: defaultY }}
      >
        <div style={{ zIndex: z, position: "absolute" }}>{children}</div>
      </Draggable>
    </>
  );
}
