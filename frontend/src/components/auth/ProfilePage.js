import React from "react";
import axiosAPI from "../api/axiosApi";

const ProfilePage = () => {
  const handleClick = async () => {
    const response = await axiosAPI.get("protected/");
    console.log(JSON.stringify(response.data));
  };
  return (
    <div>
      <h1>Profile page</h1>
      <p>Logged in as user:</p>
      <button onClick={handleClick}>GET protected</button>
    </div>
  );
};
export default ProfilePage;
