import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

// import PageNotFound from "./PageNotFound";
import ProfilePage from "./components/auth/ProfilePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";

import { Button } from "semantic-ui-react";
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
      <Button primary id="userbutton" size="small" zIndex={2000}>
        Sign In
      </Button>
      <Routes>
        <PrivateRoute exact path="/" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* <Route component={PageNotFound} /> */}
      </Routes>
    </div>
  );
}
