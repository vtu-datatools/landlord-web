import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/actions";
import StatusMessage from "../../components/statusmessage";
import Profile from "../../components/profile";
import "./styles.css";

function UserProfileContainer() {
  const params = useParams();
  const dispatch = useDispatch();

  const { isLoading, profile, error } = useSelector((state) => ({
    isLoading: state.userProfile.isLoading,
    profile: state.userProfile.profile,
    error: state.userProfile.error,
  }));

  useEffect(() => {
    dispatch(fetchUserProfile(params.username));
  }, [dispatch]);

  if (error || !profile || isLoading) {
    return (
      <StatusMessage
        error={error || !profile}
        errorClassName="userProfile-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the user profile for you`}
        type="default"
      />
    );
  }

  const { name, username, status, bio, avatar, is_staff, date_joined } =
    profile;

  return (
    <Profile
      username={username}
      name={name}
      avatar={avatar}
      status={status}
      bio={bio}
      dateJoined={date_joined}
      isStaff={is_staff}
    />
  );
}

export default UserProfileContainer;
