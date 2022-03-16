import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import ProfileButtons from "./components/ProfileButtons";

// import PageNotFound from "./PageNotFound";
import ProfilePage from "./components/auth/ProfilePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";

import "./css/App.css";

export default function App() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState();

  function handleClickMarker(address) {
    setAddress(address);
  }
  return (
    <div className="App">
      {map && <Sidebar map={map} address={address} />}
      <Map
        setMap={setMap}
        address={address}
        onClickMarker={handleClickMarker}
      />
      <ProfileButtons />
      <Routes>
        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />/
      </Routes>
    </div>
  );
}
