import React from "react";
import GuestNav from "./guestnav";
import UserNav from "./usernav";

const UserMenu = (props) => {
  const {
    isAuthenticated,
    isStaff,
    username,
    name,
    avatar,
    logout,
    isLoading,
    showRegister,
    showLogin,
    showEditProfile,
    isBigScreen,
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
        isStaff={isStaff}
      />
    );
  } else {
    return (
      <GuestNav
        showRegister={showRegister}
        showLogin={showLogin}
        isBigScreen={isBigScreen}
      />
    );
  }
};

export default UserMenu;
