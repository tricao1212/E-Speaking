import React from "react";
import { UserAuth } from "../../../context/AuthContext";
import style from "./profile.module.css";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

const Profile = () => {
  const { user } = UserAuth();
  const [avatar, setAvatar] = useState(user.avatar);
  const [level, setLevel] = useState("");
  const fetchData = () => {
    axios
      .get("https://localhost:7149/api/point/" + user.point)
      .then((response) => {
        setLevel(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={style.centerBlock}>
      <h2>Level: <span className={style.color}>{level}</span> </h2>
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image here...</p>
        ) : (
          <p>Drag and drop photos or click to select photos.</p>
        )}
        {avatar && (
          <div className={style.avatar_preview}>
            <center>
              <Avatar
                sx={{ width: 100, height: 100 }}
                className={style.avatar_image}
                src={avatar}
              />
            </center>
          </div>
        )}
      </div>
      <h2>Point: <span className={style.color}>{user.point}</span></h2>
      <div className={style.block}>
        <h4>Name: {user.name}</h4>
      </div>
      <div className={style.block}>
        <h4>Email: {user.email}</h4>
      </div>
    </div>
  );
};

export default Profile;
