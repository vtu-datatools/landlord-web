import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../../components/editprofile";
import Modal from "../../components/modal";
import {
  hideModal,
  editProfileReset,
  editProfileAction,
} from "../../redux/actions";

function EditProfileModal() {
  const dispatch = useDispatch();
  const editProfile = (newProfile) => {
    dispatch(editProfileAction(newProfile));
  };
  const handleClose = () => {
    dispatch(hideModal());
    dispatch(editProfileReset());
  };

  const { isAuthenticated, isEditing, error, avatar, name, success } =
    useSelector((state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      isEditing: state.auth.isEditing,
      error: state.auth.editError,
      avatar: state.auth.avatar,
      name: state.auth.name,
      success: state.auth.editSuccess,
    }));

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [dispatch, success]);

  return !isAuthenticated ? null : (
    <Modal onClose={handleClose} dialogStyle={{ minWidth: "500px" }}>
      <EditProfile
        avatar={avatar}
        name={name}
        handleEdit={editProfile}
        isLoading={isEditing}
        error={error}
        success={success}
      />
    </Modal>
  );
}

export default EditProfileModal;
