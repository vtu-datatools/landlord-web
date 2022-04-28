import React from "react";
import { Route, Routes } from "react-router-dom";

// import PageNotFound from "./PageNotFound";
import MapPage from "./components/map/MapPage";
import ProfilePage from "./components/auth/ProfilePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";

import "./css/App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
