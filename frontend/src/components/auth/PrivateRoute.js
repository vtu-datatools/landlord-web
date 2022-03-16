import React from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "../api/authenticationApi";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};
export default PrivateRoute;
