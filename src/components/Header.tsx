import { useState } from "react";
import "../styles/global.css";
import { AiOutlineMenu } from "react-icons/ai";

const MenuListWeb = () => {
  return (
    <nav className="hidden md:flex gap-8 font-light text-2xl tracking-widest text-white">
      <a href="#home">Home</a>
      <a href="#team">Team</a>
      <a href="#story">Story</a>
      <a href="https://kodem.wildhogstudio.com/" target="_blank">
        TCG
      </a>
    </nav>
  );
};

const MenuListMobile = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-1/2 bg-black flex flex-col items-center gap-4 py-4 md:hidden text-white">
      <a href="#home">Home</a>
      <a href="#team">Team</a>
      <a href="#story">Story</a>
      <a href="https://kodem.wildhogstudio.com" target="_blank">
        TCG
      </a>
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-black">
      <img src="./assets/logo.png" alt="logo-wh" className="w-28 h-auto" />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-2xl"
        aria-label="Toggle Menu"
      >
        <AiOutlineMenu color="white" />
      </button>

      <MenuListWeb />

      {isOpen && <MenuListMobile />}
    </header>
  );
};

export default Header;
