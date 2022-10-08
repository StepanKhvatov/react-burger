import { FC } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ children, onClose }) => {
  return (
    <div className={modalOverlayStyles["modal-overlay"]} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
