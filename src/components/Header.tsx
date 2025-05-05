import { useState } from "react";
import "../styles/global.css";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MenuListMobile, MenuListWeb } from "./Menus";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-black">
      <img src="/assets/logo.png" alt="logo-wh" className="w-28 h-auto" />

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
