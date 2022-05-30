import React from "react";
import StatusMessage from "../statusmessage";
import UserCard from "../usercard";
import "./styles.css";

const UserList = (props) => {
  const { error, users, isLoading } = props.users;
  if (error || !users || isLoading || users.length === 0) {
    return (
      <StatusMessage
        error={error || !users}
        errorClassName="users-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the users for you`}
        nothing={users && users.length === 0}
        nothingMessage={`No user to display`}
        nothingClassName="users-error"
        type="default"
      />
    );
  }

  const userCardList = users.map((user) => {
    const { name, username, avatar, is_staff } = user;
    return (
      <div key={username} className="userCard">
        <UserCard
          username={username}
          name={name}
          avatar={avatar}
          isStaff={is_staff}
        />
      </div>
    );
  });

  return <div className="usersContainer">{userCardList}</div>;
};

export default UserList;
