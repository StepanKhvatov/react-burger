import { useEffect } from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Portal from "../portal/portal";
import modalStyles from "./modal.module.css";

const Modal = ({ children, onClose, title, isOpen }) => {
  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.code === `Escape`) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);

      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [onClose, isOpen]);

  return (
    <Portal>
      <ModalOverlay onClose={onClose}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={`${modalStyles.modal} pr-10 pl-10 pt-15 pb-15`}
        >
          {title && (
            <h3 className={`${modalStyles.title} text text_type_main-large`}>
              {title}
            </h3>
          )}
          {children}
          <button
            aria-label="modal-close-button"
            type="button"
            className={modalStyles["close-button"]}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
      </ModalOverlay>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
