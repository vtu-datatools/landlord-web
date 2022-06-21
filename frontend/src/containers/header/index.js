import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Navlink from "../../components/navlink";
import UserMenu from "../../components/usermenu";
import Logo from "../../components/logo";
import { showModal, logoutUser } from "../../redux/actions";

import "./styles.css";

function HeaderContainer() {
  const dispatch = useDispatch();
  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const showRegister = () => {
    dispatch(showModal("REGISTER", {}));
  };

  const showLogin = () => {
    dispatch(showModal("LOGIN", {}));
  };

  const showEditProfile = () => {
    dispatch(showModal("EDIT_PROFILE", {}));
  };

  const { username, name, avatar, isAuthenticated, isStaff, isLoading } =
    useSelector((state) => ({
      username: state.auth.username,
      name: state.auth.name,
      avatar: state.auth.avatar,
      isAuthenticated: state.auth.isAuthenticated,
      isStaff: state.auth.isStaff,
      isLoading: state.auth.isLoading,
    }));
  if (isBigScreen) {
    return (
      <div className="headerContainer">
        <Logo />
        <Navlink isBigScreen={isBigScreen} />
        <UserMenu
          isAuthenticated={isAuthenticated}
          isStaff={isStaff}
          username={username}
          name={name}
          avatar={avatar}
          logout={handleLogout}
          isLoading={isLoading}
          showRegister={showRegister}
          showLogin={showLogin}
          showEditProfile={showEditProfile}
          isBigScreen={isBigScreen}
        />
      </div>
    );
  } else {
    return (
      <div className="headerContainer">
        <Navlink />
        <Logo />
        <UserMenu
          isAuthenticated={isAuthenticated}
          isStaff={isStaff}
          username={username}
          name={name}
          avatar={avatar}
          logout={handleLogout}
          isLoading={isLoading}
          showRegister={showRegister}
          showLogin={showLogin}
          showEditProfile={showEditProfile}
        />
      </div>
    );
  }
}

export default HeaderContainer;
