import React from "react";
import logo from "../../images/logo2.png";
import header from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img className={header.img} src={logo} alt="logo" />
        </Link>
      </header>
    </>
  );
};

export default Header;
