import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/login";
import Modal from "../../components/modal";
import {
  hideModal,
  loginReset,
  showModal,
  loginUser,
} from "../../redux/actions";

function LoginModal() {
  const dispatch = useDispatch();
  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password));
  };
  const handleClose = () => {
    dispatch(hideModal());
    dispatch(loginReset());
  };
  const showRegister = () => {
    dispatch(showModal("REGISTER", {}));
    dispatch(loginReset());
  };

  const { isAuthenticated, error, isLoading } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
  }));

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [dispatch]);
  return isAuthenticated ? null : (
    <Modal onClose={handleClose}>
      <Login
        handleLogin={handleLogin}
        showRegister={showRegister}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}

export default LoginModal;
