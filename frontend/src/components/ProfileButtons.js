import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { logoutUser } from "../redux/actions/auth";

const ProfileButtons = ({ accessToken, logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate.push("login/");
  };

  return (
    <nav>
      {accessToken ? (
        <>
          <Button primary as={NavLink} to="/profile">
            Profile
          </Button>
          <Button primary as={NavLink} to="/logout" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button primary as={NavLink} to="/login">
            Login
          </Button>
          <Button primary as={NavLink} to="/sign-up">
            Sign Up
          </Button>
        </>
      )}
    </nav>
  );
};
ProfileButtons.propTypes = {
  accessToken: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    accessToken: state.auth,
  };
}
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButtons);
