import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Icon, Dropdown, Menu } from "semantic-ui-react";
import "./styles.css";

const Navlink = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });
  const navigate = useNavigate();
  const homeClick = useCallback(() => navigate("/"));
  const forumsClick = useCallback(() => navigate("/forums"));
  const usersClick = useCallback(() => navigate("/users"));
  const electionClick = useCallback(() => navigate("/votes"));
  if (isBigScreen) {
    return (
      <div className="navlinkContainer">
        <div className="link">
          <Icon name="home" className="navlinkIcon" />
          <Link to="/">Home</Link>
        </div>
        <div className="link">
          <Icon name="discussions" className="navlinkIcon" />
          <Link to="/forums">Forums</Link>
        </div>
        <div className="link">
          <Icon name="users" className="navlinkIcon" />
          <Link to="/users">Users</Link>
        </div>
        <div className="link">
          <Icon name="wordpress forms" className="navlinkIcon" />
          <Link to="/votes">Elections</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navlinkContainer-mobile">
        <Menu fluid inverted borderless className="navlinkDrop">
          <Dropdown item icon="bars" className="navlinkDropdown">
            <Dropdown.Menu>
              <Dropdown.Item icon="home" text="Home" onClick={homeClick} />
              <Dropdown.Item
                icon="discussions"
                text="Forums"
                onClick={forumsClick}
              />
              <Dropdown.Item icon="users" text="Users" onClick={usersClick} />
              <Dropdown.Item
                icon="wordpress forms"
                text="Elections"
                onClick={electionClick}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
};

export default Navlink;
