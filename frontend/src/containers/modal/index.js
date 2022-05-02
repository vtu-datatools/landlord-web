import React from "react";
import { useSelector } from "react-redux";
import RegisterModal from "./register";
import LoginModal from "./login";
// import EditProfileModal from "./editprofile";

const ModalContainer = () => {
  const { modalType } = useSelector((state) => ({
    modalType: state.modal.modalType,
  }));

  switch (modalType) {
    case "REGISTER":
      return <RegisterModal />;
    case "LOGIN":
      return <LoginModal />;
    // case "EDIT_PROFILE":
    //   return <EditProfileModal />;
    default:
      return null;
  }
};

export default ModalContainer;
