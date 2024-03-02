import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo2.png";
import style from "./adminsidebar.module.css";
import { UserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

const AdminSidebar = () => {
  const location = useLocation();
  const [currentButton, setCurrentButton] = useState(location.pathname);
  console.log(location.pathname);

  const handleButtonClick = (buttonId) => {
    setCurrentButton(buttonId);
  };
  const { logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <center>
          <img src={logo} alt="logo" />
        </center>
      </div>
      <div className={style.option}>
        <Link to="/admin">
          <Button
          className={currentButton === '/admin' ? style.activeButton : ""}
          onClick={() => handleButtonClick(location.pathname)}
            variant="text"
            startIcon={<HomeOutlinedIcon />}
          >
            Home
          </Button>
        </Link>
        <Link to="/admin/words">
          <Button className={currentButton === '/admin/words' ? style.activeButton : ""}
        onClick={() => handleButtonClick(location.pathname)} variant="text" startIcon={<FontDownloadOutlinedIcon />}>
            Words
          </Button>
        </Link>
        <Link to="/admin/sentences">
          <Button className={currentButton === '/admin/sentences' ? style.activeButton : ""}
        onClick={() => handleButtonClick(location.pathname)}  variant="text" startIcon={<AbcOutlinedIcon />}>
            Sentences
          </Button>
        </Link>
        {/* <Link to="/admin">
          <Button className={currentButton === '/admin' ? style.activeButton : ""}
        onClick={() => handleButtonClick(location.pathname)} variant="text" startIcon={<LibraryBooksOutlinedIcon />}>
            Topic
          </Button>
        </Link>
        <Link to="/admin">
          <Button className={currentButton === '/admin' ? style.activeButton : ""}
        onClick={() => handleButtonClick(location.pathname)}  variant="text" startIcon={<PersonPinOutlinedIcon />}>
            User info
          </Button>
        </Link> */}
        <div className={style.logOut}>
          <Button startIcon={<LogoutOutlinedIcon />} onClick={handleSignOut}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
