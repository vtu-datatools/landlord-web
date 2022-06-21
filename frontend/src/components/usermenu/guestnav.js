import React from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import "./styles.css";

const GuestNav = (props) => {
  const { showLogin, showRegister, isBigScreen } = props;

  if (isBigScreen) {
    return (
      <div className="guestMenu-big">
        <Button
          inverted
          className="btn-sign-in"
          type="button"
          onClick={showLogin}
        >
          Login
        </Button>
        <br />
        <Button
          inverted
          className="btn-register"
          type="button"
          onClick={showRegister}
        >
          Register
        </Button>
      </div>
    );
  } else {
    return (
      <div className="guestMenu">
        <Menu fluid inverted borderless className="guestMenu-menu">
          <Dropdown item icon="user" className="guestDropdown" direction="left">
            <Dropdown.Menu>
              <Dropdown.Item
                icon="sign-in"
                text="Sign In"
                onClick={showLogin}
              />
              <Dropdown.Item
                icon="user plus"
                text="Register"
                onClick={showRegister}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
};

export default GuestNav;
