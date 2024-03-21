import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo2.png";
import style from "./adminsidebarmobile.module.css";
import { UserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import ScienceIcon from "@mui/icons-material/Science";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {List, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import { Image } from "react-bootstrap";
const AdminSidebarMobile = ({isOpen, onSwitch}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
      <div className={style.logo}>
        <center>
          <Image src={logo} fluid alt="logo" />
        </center>
      </div>
      <div className={style.option}>
        <List
          sx={{ width: "100%", bgcolor: "#F0F8FF" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={()=>{
              navigate("/admin")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname === "/admin"}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            onClick={()=>{
              navigate("/admin/words")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname.includes("/admin/words")}
          >
            <ListItemIcon>
              <FontDownloadOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Words" />
          </ListItemButton>
          <ListItemButton
            onClick={()=>{
              navigate("/admin/sentences")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname.includes("/admin/sentences")}
          >
            <ListItemIcon>
              <AbcOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sentences" />
          </ListItemButton>
          <ListItemButton
            onClick={()=>{
              navigate("/admin/lessons")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname.includes("/admin/lessons")}
          >
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Lessons" />
          </ListItemButton>
          <ListItemButton
            onClick={()=>{
              navigate("/admin/levels")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname.includes("/admin/levels")}
          >
            <ListItemIcon>
              <ScienceIcon />
            </ListItemIcon>
            <ListItemText primary="Level" />
          </ListItemButton>
          <ListItemButton
            onClick={()=>{
              navigate("/admin/users")
              onSwitch()
            }}
            className={style.text}
            selected={location.pathname === "/admin/users"}
          >
            <ListItemIcon>
              <PersonPinOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
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
export default AdminSidebarMobile;
