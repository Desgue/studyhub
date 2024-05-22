import bg from "../../../assets/background/mountain-sunset.jpg";

function MountainSunset() {
  return (
    <div className="fixed inset-0">
      <div className="inset-0 bg-cover block  absolute z-0">
        <img
          src={bg}
          alt="background image"
          className="object-cover md:object-fill h-full w-full "
        />
      </div>
    </div>
  );
}

export default MountainSunset;
