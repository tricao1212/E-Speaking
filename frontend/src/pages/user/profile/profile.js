import React from 'react'
import { UserAuth } from "../../../context/AuthContext";
import Avatar from '@mui/material/Avatar';

const profile = () => {
    const { user } = UserAuth();
  return (
    <div>
      <Avatar src={user.avatar} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default profile
