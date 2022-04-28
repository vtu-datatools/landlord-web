import React from "react";
import Logo from "../logo";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "./styles.css";

const Navlink = () => {
  return (
    <div className="navlinkContainer">
      <Logo />
      <div className="link">
        <Icon name="home" className="navlinkIcon" />
        <Link to="/">Home</Link>
      </div>
      <div className="link">
        <Icon name="users" className="navlinkIcon" />
        <Link to="/users">Users</Link>
      </div>
      <div className="link">
        <Icon name="github" className="navlinkIcon" />
        <a href="https://www.vancouvertenantsunion.ca/">VTU Homepage</a>
      </div>
    </div>
  );
};

export default Navlink;
