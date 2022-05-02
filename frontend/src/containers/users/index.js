import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions";
import UserList from "../../components/userlist";

function UsersContainer() {
  const dispatch = useDispatch();

  const { isLoading, users, error } = useSelector((state) => ({
    error: state.error,
    isLoading: state.isLoading,
    users: state.users,
  }));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="UsersPage">
      <UserList isLoading={isLoading} users={users} error={error} />;
    </div>
  );
}

export default UsersContainer;
