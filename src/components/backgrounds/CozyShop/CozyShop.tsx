import cozyShop from "../../../assets/background/lofi-rainy-cozy-shop.mp4";

const CozyShop = () => {
  return (
    <div className="fixed z-0 inset-0 ">
      <video
        autoPlay
        muted
        loop
        id="cozy shop video"
        className="object-cover w-full h-full  "
      >
        <source src={cozyShop} type="video/mp4" />
      </video>
    </div>
  );
};

export default CozyShop;
