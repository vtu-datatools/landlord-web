import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../../components/register";
import Modal from "../../components/modal";
import {
  hideModal,
  registerReset,
  showModal,
  register,
} from "../../redux/actions";

function RegisterModal() {
  const dispatch = useDispatch();

  const handleRegister = (data) => dispatch(register(data));
  const handleClose = () => {
    dispatch(hideModal());
    dispatch(registerReset());
  };
  const showLogin = () => {
    dispatch(showModal("LOGIN", {}));
    dispatch(registerReset());
  };

  const { isAuthenticated, error, isLoading } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.register.error,
    isLoading: state.register.isLoading,
  }));

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [dispatch]);

  return isAuthenticated ? null : (
    <Modal onClose={handleClose}>
      <Register
        handleRegister={handleRegister}
        showLogin={showLogin}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}

export default RegisterModal;
