import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import MapPage from "./components/map/MapPage";
import ProfilePage from "./components/auth/ProfilePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginPage from "./components/login";
import SignUpPage from "./components/register";

import HeaderContainer from "./containers/header";
import UsersContainer from "./containers/users";
import UserProfileContainer from "./containers/userprofile";
import ModalContainer from "./containers/modal";
import ForumListContainer from "./containers/forumlist";
import ForumContainer from "./containers/forum";

import "./App.css";

export default function App() {
  return (
    <Fragment>
      <div className="App">
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/user/:username" element={<UserProfileContainer />} />
          <Route exact path="/profile" element={<PrivateRoute />}>
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forums" element={<ForumListContainer />} />
          <Route path="/forum/:forum" element={<ForumContainer />} />
        </Routes>
      </div>
      <ModalContainer />
    </Fragment>
  );
}
