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
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const AdminSidebar = () => {
  const location = useLocation();
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
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#F0F8FF' }}
        component="nav" aria-labelledby="nested-list-subheader"
        >
          <ListItemButton as={NavLink} to={'/admin'} className={style.text} selected={location.pathname === "/admin"} >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton as={NavLink}  to={'/admin/words'} className={style.text} selected={location.pathname === "/admin/words"}>
            <ListItemIcon>
              <FontDownloadOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Words"  />
          </ListItemButton>
          <ListItemButton as={NavLink} to={'/admin/sentences'} className={style.text} selected={location.pathname === "/admin/sentences"}>
            <ListItemIcon>
              <AbcOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sentences" />
          </ListItemButton>
          <ListItemButton as={NavLink} to={'/admin/difficulties'} className={style.text} selected={location.pathname === "/admin/difficulties"}>
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Lessons" />
          </ListItemButton>
          <ListItemButton as={NavLink} to={'/admin/levels'} className={style.text} selected={location.pathname === "/admin/levels"}>
            <ListItemIcon>
              <PersonPinOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Level" />
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
export default AdminSidebar;
