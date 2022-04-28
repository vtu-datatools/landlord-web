import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Image, Grid } from "semantic-ui-react";

import axiosAPI from "../../api/axiosApi";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      const response = await axiosAPI.get("protected/");
      setUser(response.data);
    };
    getUserData();
  }, []);
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle"></Grid>
      <Header as="h2">
        <Image src="/VTU_logo.jpg" /> Profile
      </Header>
      <p>Username: {user.username}</p>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <Button id="back_button" content="Back" onClick={() => navigate(-1)} />
      <Grid />
    </div>
  );
};
export default ProfilePage;
