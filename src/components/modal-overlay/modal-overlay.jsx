import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={modalOverlayStyles["modal-overlay"]} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
