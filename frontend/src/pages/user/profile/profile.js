import React from "react";
import { UserAuth } from "../../../context/AuthContext";
import style from "./profile.module.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";

const Profile = () => {
  const { user } = UserAuth();
  const [avatar, setAvatar] = useState(user.avatar);

  console.log(avatar);
  const onDrop = (acceptedFiles) => {
    // Xử lý file được chấp nhận ở đây
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
      <h2>Level: </h2>
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Thả ảnh vào đây...</p>
        ) : (
          <p>Kéo và thả ảnh hoặc nhấp để chọn ảnh.</p>
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
      <h2>Point: </h2>
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
