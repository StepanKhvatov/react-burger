import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Portal from "../portal/portal";
import modalStyles from "./modal.module.css";

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const closeModal = (e) => {
      if (e.code === `Escape`) {
        onClose();
      }
    };

    window.addEventListener(`keydown`, closeModal);

    document.body.classList.add("hide-overlow_active");

    return () => {
      window.removeEventListener(`keydown`, closeModal);

      document.body.classList.remove("hide-overlow_active");
    };
  }, [onClose]);

  return (
    <Portal>
      <ModalOverlay onClose={onClose}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={`${modalStyles.modal} pr-10 pl-10 pt-15 pb-15`}
        >
          {title && <h3 className="text text_type_main-large">{title}</h3>}
          {children}
          <button
            aria-label="modal-close-button"
            type="button"
            className={modalStyles["close-button"]}
          >
            <CloseIcon />
          </button>
        </div>
      </ModalOverlay>
    </Portal>
  );
};

export default Modal;
