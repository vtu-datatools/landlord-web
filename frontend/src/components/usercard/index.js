import React from "react";
import { Card } from "semantic-ui-react";
import Avatar from "../avatar";
import { Link } from "react-router-dom";
import "./styles.css";

function UserCard(props) {
  const { name, username, isStaff, avatar } = props;
  return (
    <Card>
      <Avatar
        className="userCard-avatar"
        avatar={avatar}
        link={`/user/${username}`}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <Link to={`/user/${username}`}>@{username}</Link>
          <b style={{ color: "red", fontSize: "12px" }}>
            {isStaff ? " (Staff) " : ""}
          </b>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default UserCard;
