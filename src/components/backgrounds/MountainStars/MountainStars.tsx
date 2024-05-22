import bg from "../../../assets/background/mountain-night-stars.jpg";
function MountainStars() {
  return (
    <div
      className=" w-screen h-screen fixed inset-0 z-0 block "
      style={{ background: `url(${bg}) no-repeat center center ` }}
    ></div>
  );
}

export default MountainStars;
