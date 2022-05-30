import React from "react";
import Button from "../button";
import "./styles.css";

const GuestNav = (props) => {
  const { showLogin, showRegister } = props;
  return (
    <div className="guestMenu">
      <Button className="btn-sign-in" type="button" onClick={showLogin}>
        Login
      </Button>
      <br />
      <Button className="btn-register" type="button" onClick={showRegister}>
        Register
      </Button>
    </div>
  );
};

export default GuestNav;
