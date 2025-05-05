import { Link } from "react-router-dom";
import useVisibility from "../hooks/useVisibility";

export const MenuListWeb = () => {
  const { isVisible, toggleVisibility } = useVisibility();

  return (
    <nav className="hidden md:flex gap-8 font-light text-2xl tracking-widest text-white">
      <Link to={"/"} className="hover:opacity-70">
        Home{" "}
      </Link>
      <Link to={"/"} className="hover:opacity-70">
        Story{" "}
      </Link>
      <Link to={"/"} className="hover:opacity-70">
        Team{" "}
      </Link>
      <div
        onClick={toggleVisibility}
        className={`relative cursor-pointer ${
          !isVisible && "hover:opacity-70"
        }`}
      >
        TCG
        {isVisible && (
          <div
            className={`absolute top-10 right-0 w-48 bg-gray-700 border border-gray-300 rounded shadow-lg z-10 p-3 flex flex-col gap-2 text-base text-white transition-opacity duration-300 ${
              isVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Link to="/TCG/league" className="hover:opacity-70">
              Liga
            </Link>
            <a
              href="https://kodem.wildhogstudio.com"
              target="_blank"
              className="hover:opacity-70"
            >
              Kodem DeckBuilder
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export const MenuListMobile = () => {
  const { isVisible, toggleVisibility } = useVisibility();
  return (
    <div className="absolute top-0 left-0 h-full w-1/2 bg-black flex flex-col items-center gap-4 py-4 md:hidden text-white">
      <a href="#home">Home</a>
      <a href="#team">Team</a>
      <a href="#story">Story</a>
      <div onClick={toggleVisibility} className="relative cursor-pointer">
        TCG
        {isVisible && (
          <div className="flex flex-col justify-center items-start text-white  text-base absolute ml-3">
            <Link to="/TCG/league">Liga</Link>
            <a href="https://kodem.wildhogstudio.com" target="_blank">
              Kodem DeckBuilder
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
