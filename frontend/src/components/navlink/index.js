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
        <Icon name="discussions" className="navlinkIcon" />
        <Link to="/forums">Forums</Link>
      </div>
    </div>
  );
};

export default Navlink;
