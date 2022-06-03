import React from "react";
import GuestNav from "./guestnav";
import UserNav from "./usernav";

const UserMenu = (props) => {
  const {
    isAuthenticated,
    username,
    name,
    avatar,
    logout,
    isLoading,
    showRegister,
    showLogin,
    showEditProfile,
  } = props;

  if (isAuthenticated) {
    return (
      <UserNav
        username={username}
        name={name}
        avatar={avatar}
        logout={logout}
        showEditProfile={showEditProfile}
        isLoading={isLoading}
      />
    );
  } else {
    return <GuestNav showRegister={showRegister} showLogin={showLogin} />;
  }
};

export default UserMenu;
