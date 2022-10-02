import { useEffect, FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Portal from "../portal/portal";
import modalStyles from "./modal.module.css";

type TModalProps = {
  onClose: () => void;
  title?: string;
  isOpen: boolean;
};

const Modal: FC<TModalProps> = ({ children, onClose, title, isOpen }) => {
  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
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
            <CloseIcon type="primary" />
          </button>
        </div>
      </ModalOverlay>
    </Portal>
  );
};

export default Modal;
