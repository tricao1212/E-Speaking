import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo2.png";
import style from "./userSidebar.module.css";
import { UserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const UserSidebar = () => {
  const location = useLocation();
  const { logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0.5) { // Adjust the scroll position as needed
        setIsSidebarFixed(true);
      } else {
        setIsSidebarFixed(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={isSidebarFixed ? `${style.sidebar} ${style.fixed}` : style.sidebar}>
      <div className={style.logo}>
        <center>
          <img src={logo} alt="logo" />
        </center>
      </div>
      <div className={style.option}>
        <List
        sx={{ width: '100%', bgcolor: '#F0F8FF' }}
        component="nav" aria-labelledby="nested-list-subheader"
        >
          <ListItemButton as={Link} to={'/user/learn'} className={style.text} selected={location.pathname.includes("/user/learn")} >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Learn" />
          </ListItemButton>
          <ListItemButton as={Link}  to={'/user/profile'} className={style.text} selected={location.pathname.includes("/user/profile")}>
            <ListItemIcon>
              <FontDownloadOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile"  />
          </ListItemButton>
          <ListItemButton as={Link} to={'/user/ranking'} className={style.text} selected={location.pathname.includes("/user/ranking")}>
            <ListItemIcon>
              <AbcOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
          </ListItemButton>
        </List>
        <div className={style.logOut}>
          <Button startIcon={<LogoutOutlinedIcon />} onClick={handleSignOut}>
            Log Out
          </Button>
        </div>
      </div>
     </div>
  );
};
export default UserSidebar;
