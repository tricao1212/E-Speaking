import { Link } from "react-router-dom";
import style from "./usersidebarmobile.module.css";
// import { UserAuth } from "../../context/AuthContext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";

const UserSidebar = () => {
  const [value, setValue] = useState(0);
  // const { logOut } = UserAuth();
  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className={style.sidebar}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/user/learn" label="Learn" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction component={Link} to="/user/profile" label="Profile" icon={<FontDownloadOutlinedIcon />} />
          <BottomNavigationAction component={Link} to="/user/ranking" label="Ranking" icon={<AbcOutlinedIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  );
};
export default UserSidebar;
