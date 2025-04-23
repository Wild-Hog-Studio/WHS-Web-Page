import "../styles/global.css";

const Hero = () => {
  return (
    <div
      className="flex w-full h-[30vh] justify-center items-center px-8"
      style={{
        backgroundImage: "url('./assets/Background.png')",
      }}
    >
      <img
        src="./assets/Eslogan.png"
        className="w-[90%]  max-w-md sm:max-w-lg  md:max-w-xl  object-contain"
        alt="slogan"
      />
    </div>
  );
};

export default Hero;
