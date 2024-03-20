import React, { useState, useEffect } from "react";
import style from "./ranking.module.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { UserAuth } from "../../../context/AuthContext";

const Ranking = () => {
  const [allUser, setAllUser] = useState([]);
  const { user } = UserAuth();
  const fetchData = async () => {
    await axios.get("http://34.136.63.21/api/auth").then((response) => {
      setAllUser(response.data.sort((a, b) => b.point - a.point));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentTop = () => {
    for (let x = 0; x < allUser.length; x++) {
      if (allUser[x].uid === user.uid) {
        x = x + 1;
        return x;
      }
    }
    return "";
  };

  const currentTop = getCurrentTop();

  return (
    <>
      <div className={style.rankTable}>
        <h2>Your current rank</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {currentTop}
                </TableCell>
                <TableCell>
                  <Avatar src={user.avatar} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.point}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h2>Leader Board</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Top</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Total point</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUser.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Avatar src={row.avatar} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.point}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Ranking;
