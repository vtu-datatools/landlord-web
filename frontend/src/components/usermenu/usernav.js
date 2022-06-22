import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar";
import { Menu, Dropdown } from "semantic-ui-react";
import "./styles.css";

const UserNav = (props) => {
  const navigate = useNavigate();
  const { username, avatar, logout, isStaff, showEditProfile, name } = props;
  const myProfile = () => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="userMenu">
      <Menu fluid inverted borderless size="large" className="userMenu-menu">
        <Menu.Item disabled className="userMenu-avatar">
          <Avatar avatar={avatar} />
        </Menu.Item>
        <Dropdown item text={name || username} direction="left">
          <Dropdown.Menu>
            <Dropdown.Item onClick={myProfile} icon="user" text="My Profile" />
            <Dropdown.Item
              onClick={showEditProfile}
              icon="setting"
              text="Edit Profile"
            />
            {isStaff && (
              <Dropdown.Item
                href={process.env.PUBLIC_URL + "/admin/"}
                icon="settings"
                text="Admin Page"
              />
            )}
            <Dropdown.Item onClick={logout} icon="sign out" text="Logout" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};

export default UserNav;
