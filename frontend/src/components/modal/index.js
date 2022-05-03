import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import "./styles.css";

function Modal(props) {
  const listenKeyboard = (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      props.onClose();
    }
  };

  const closeModal = () => {
    props.onClose();
  };

  const onDialogClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (props.onClose) {
      window.removeEventListener("keydown", listenKeyboard, true);
    }
  }, []);

  const overlayStyle = props.overlayStyle ? props.overlayStyle : {};
  const contentStyle = props.contentStyle ? props.contentStyle : {};
  const dialogStyle = props.dialogStyle ? props.dialogStyle : {};

  return (
    <div>
      <div className="modal-overlay-div" style={overlayStyle} />
      <div
        className="modal-content-div"
        style={contentStyle}
        onClick={closeModal}
      >
        <div
          className="modal-dialog-div"
          style={dialogStyle}
          onClick={onDialogClick}
        >
          <Icon
            name="window close outline"
            size="large"
            className="modal-close-div"
            onClick={closeModal}
          />
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
